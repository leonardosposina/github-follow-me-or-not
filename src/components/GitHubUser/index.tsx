/* eslint-disable camelcase */
import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';

import IGitHubProfileDTO from '../../dtos/IGitHubProfileDTO';

import './styles.css';

interface IGitHubUserProps {
  anchorId: string;
  profile: IGitHubProfileDTO;
}

const GitHubUser: React.FC<IGitHubUserProps> = ({ anchorId, profile }) => {
  return (
    <Col id={anchorId}>
      <Card>
        <span className="text-center">
          <Image
            className="user-profile-image"
            src={profile.avatar_url}
            alt={profile.name}
            roundedCircle
          />
        </span>
        <Card.Body>
          <div className="text-center">
            <Card.Title>{profile.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {profile.login}
            </Card.Subtitle>
          </div>
          <Card.Text className="user-profile-details">
            <span>
              Followers:&nbsp;
              <strong>{profile.followers}</strong>
            </span>
            <span>
              Following:&nbsp;
              <strong>{profile.following}</strong>
            </span>
            <span>
              Public repos:&nbsp;
              <strong>{profile.public_repos}</strong>
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default GitHubUser;
