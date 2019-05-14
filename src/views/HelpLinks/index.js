import React, { Component, Fragment } from 'react';
import HelpHeader from '../../components/HelpHeader';
import TextLink from '../../components/TextLink/TextLink';
import fileSymbol from '../../images/file.svg';
import './helpLink.scss';

class HelperPage extends Component {

  renderLinks(documentLink, text) {
    return (
      <Fragment>
        <TextLink
          imageSrc={fileSymbol}
          symbolClass="login-symbol__file"
          textLinkClass="login-page__link"
          textClass="login-page__link-text"
          altText="File Symbol"
          text={text}
          link={documentLink} />
      </Fragment>
    );
  }

  renderTravelPolicyDocuments() {
    const travelIntranet = 'https://sites.google.com/andela.com/travel-intranet/home?authuser=0';
    const andelaPolicy = 'https://docs.google.com/document/d/1ZqJ3OAF-7NfJAgkzMBdiMoTrsftTWJp9tNhV8eOe1d8/edit';
    const IntranetTitle = 'Travel Intranet';
    const AndelaTitle = 'Andela Policy';

    return (
      <div>
        <div className="policy-document">
          <div className="item-name">
            {this.renderLinks(travelIntranet, IntranetTitle)}
          </div>
        </div>
        <div className="policy-document">
          <div className="item-name">
            {this.renderLinks(andelaPolicy, AndelaTitle)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <HelpHeader />
        {this.renderTravelPolicyDocuments()}
      </div>
    );
  }
}

export default HelperPage;
