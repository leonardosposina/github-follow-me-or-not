import React from 'react';
import { Col, Card, Badge, Spinner } from 'react-bootstrap';

import IGitHubContactDTO from '../../dtos/IGitHubContactDTO';

import GitHubContactItem from './GitHubContactItem';

import './styles.css';

interface IGitHubContactsProps {
  title: string;
  anchorId: string;
  contacts: IGitHubContactDTO[];
}

const GitHubContacts: React.FC<IGitHubContactsProps> = ({
  title,
  anchorId,
  contacts,
}) => {
  return (
    <Col id={anchorId}>
      <Card>
        <Card.Body>
          <p className="title">
            {`${title}: `}
            <Badge pill variant="secondary">
              {contacts.length}
            </Badge>
          </p>
          {!contacts && (
            <p className="text-center">
              <Spinner animation="border" />
            </p>
          )}
          <ul className="list-unstyled list-scroll">
            {contacts.map(item => (
              <GitHubContactItem key={item.id} contact={item} />
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default GitHubContacts;
