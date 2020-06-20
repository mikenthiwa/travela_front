#!/usr/bin/env bash
ROOT_DIR=$(pwd)

source $ROOT_DIR/jenkins/scripts/utils.sh

# This function is for clonning deployment script repository
# that contains files to deploy the application
checkoutDeployScriptRepo(){
    require DEPLOY_SCRIPTS_REPO $DEPLOY_SCRIPTS_REPO
    require CLONE_BRANCH $CLONE_BRANCH

    info "Cloning $DEPLOY_SCRIPTS_REPO"
    git clone -b $CLONE_BRANCH $DEPLOY_SCRIPTS_REPO $HOME/travela-deploy
    mv $HOME/travela-deploy/deploy $ROOT_DIR/deploy
    source $ROOT_DIR/deploy/template.sh
    rm -rf $HOME/travela-deploy
}

# This function builds the docker image that would be having application
# for staging and production and pushes it to docker registry
buildTagAndPushDockerImage() {
    require 'DOCKER_REGISTRY' $DOCKER_REGISTRY
    require 'PROJECT_ID' $PROJECT_ID
    require 'IMAGE_TAG' $IMAGE_TAG
    require 'GCLOUD_SERVICE_KEY' $GCLOUD_SERVICE_KEY

    # gcr.io/apprenticeship-projects/travela-frontend
    IMAGE_NAME="$DOCKER_REGISTRY/$PROJECT_ID/$PROJECT_NAME"
    TAGGED_IMAGE=$IMAGE_NAME:$IMAGE_TAG
    DOCKER_USERNAME=${DOCKER_USERNAME:-_json_key}

    info "Build docker image for travela application"
    docker build -t $IMAGE_NAME -f docker/Dockerfile .

    info "Tagging built docker image as $TAGGED_IMAGE"
    docker tag $IMAGE_NAME $TAGGED_IMAGE
    is_success "Image successfully tagged $TAGGED_IMAGE"

    info "Login to $DOCKER_REGISTRY container registry"
    is_success_or_fail $(docker login -u  $DOCKER_USERNAME --password-stdin https://${DOCKER_REGISTRY} < $GCLOUD_SERVICE_KEY)

    info "Push $TAGGED_IMAGE to $DOCKER_REGISTRY container registry"
    docker push $TAGGED_IMAGE

    info "Logout of docker container registry"
    is_success_or_fail $(docker logout https://${DOCKER_REGISTRY})

}

# This function converts the template kubernetes files into
# actual kubernetes files that would be used for deployment
buildLintAndDeployK8sConfiguration(){
    findTempateFiles 'TEMPLATES'
    findAndReplaceVariables

    info "Linting generated configuration files"
    k8s-lint -f deploy/travela-frontend.config
    is_success "Completed linting successfully"

    info "Initiating deployment for image $TAGGED_IMAGE to $ENVIRONMENT environment"
    k8s-deploy-and-verify -f deploy/travela-frontend.config
    is_success "$TAGGED_IMAGE successfully deployed"
}

# This function sets the message that would be sent to slack for notifying
# us about the status of deployment
slackPayLoad() {
  if [ "$1" == "fail" ]; then
    TEXT=":fire: Travela Frontend deployment failed :fire:"
    STYLE="danger"
    TITLE="Failed to deploy commit"
    COLOR="danger"
  else
    TEXT=":rocket: Travela Frontend has been successfully deployed to ${ENVIRONMENT} environment :rocket:"
    STYLE="primary"
    TITLE="Deployed commit"
    COLOR="good"
  fi

cat <<EOF
{
    "channel":"${NOTIFICATION_CHANNEL}",
    "username": "DeployNotification",
    "text": "${TEXT}",
    "attachments": [
      {
        "title": "${TITLE} >> $(git rev-parse --short HEAD)",
        "title_link": "https://github.com/andela/travel_tool_front/commit/$CIRCLE_SHA1",
        "color": "${COLOR}",
        "actions": [
          {
            "text": "View Commit",
            "type": "button",
            "url": "https://github.com/andela/travel_tool_front/commit/${CIRCLE_SHA1}",
            "style": "${STYLE}"
          },
          {
            "text": "View Build",
            "type": "button",
            "url": "${CIRCLE_BUILD_URL}",
            "style": "${STYLE}"
          },
          {
            "text": "View Workflow",
            "type": "button",
            "url": "https://circleci.com/workflow-run/${CIRCLE_WORKFLOW_ID}",
            "style": "${STYLE}"
          }
        ]
      }
    ]
}
EOF
}

# This function sends the status of the deployment to slack for master
# or develop branch
sendSlackDeployNotification() {
  if [ "${BRANCH_NAME}" == "master" ] \
  || [ "${BRANCH_NAME}" == "develop" ] \
  || [ "${BRANCH_NAME}" == "test-jenkins" ]
  then
    require NOTIFICATION_CHANNEL $NOTIFICATION_CHANNEL
    require SLACK_CHANNEL_HOOK $SLACK_CHANNEL_HOOK

    if [ "$1" == "fail" ]; then
      INFO="Sending failure message to slack"
    else
      INFO="Sending success message to slack"
    fi

    info "${INFO}"
    curl -X POST -H 'Content-type: application/json' --data "$(slackPayLoad "${1}")" "${SLACK_CHANNEL_HOOK}"
    is_success "Slack notification has been successfully sent"
  else
    info "Sends notification for master or develop branch only"
  fi
}

# This function is used to call all the other functions in this script
main() {
    checkoutDeployScriptRepo
    buildTagAndPushDockerImage
    buildLintAndDeployK8sConfiguration
    sendSlackDeployNotification
    cleanGeneratedYamlFiles
}

# This would expand to the positional parameters, starting from one
$@
