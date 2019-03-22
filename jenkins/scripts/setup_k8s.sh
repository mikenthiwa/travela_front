#!/usr/bin/env bash
ROOT_DIR=$(pwd)

source $ROOT_DIR/jenkins/scripts/utils.sh

# This function is used to sign into google cloud's command line application
activateServiceAccount() {
    require PROJECT_ID $PROJECT_ID
    require COMPUTE_ZONE $COMPUTE_ZONE
    require CLUSTER_NAME $CLUSTER_NAME
    require GCLOUD_SERVICE_KEY $GCLOUD_SERVICE_KEY

    info "Activate Google Service Account"
    # setup kubectl auth
    gcloud auth activate-service-account --key-file $GCLOUD_SERVICE_KEY
    gcloud --quiet config set project ${PROJECT_ID}
    gcloud --quiet config set compute/zone ${COMPUTE_ZONE}
    gcloud --quiet container clusters get-credentials ${CLUSTER_NAME}
}

main(){
    activateServiceAccount
}

$@
