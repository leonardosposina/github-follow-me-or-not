import React from 'react';
import { Media, Image } from 'react-bootstrap';

import IGitHubContactDTO from '../../../dtos/IGitHubContactDTO';

import './styles.css';

interface IGitHubProfileItemProps {
  contact: IGitHubContactDTO;
}

const GitHubContactItem: React.FunctionComponent<IGitHubProfileItemProps> = ({
  contact,
}) => {
  return (
    <Media as="li" className="media-profile-item">
      <Image
        width={64}
        height={64}
        className="mr-3"
        src={contact.avatar_url}
        alt={contact.login}
        roundedCircle
      />
      <Media.Body>
        <a
          href={contact.html_url}
          className="media-profile-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>{contact.login}</h5>
          <p className="text-muted">
            GitHub
            {contact.type}
          </p>
        </a>
      </Media.Body>
    </Media>
  );
};

export default GitHubContactItem;
