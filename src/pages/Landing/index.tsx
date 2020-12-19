import React, { useState, FormEvent, useEffect, useCallback } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Row,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import GitHubUser from '../../components/GitHubUser';
import GitHubContacts from '../../components/GitHubContacts';

import IGitHubProfileDTO from '../../dtos/IGitHubProfileDTO';
import IGitHubContactDTO from '../../dtos/IGitHubContactDTO';
import IGitHubRateLimitsDTO from '../../dtos/IGitHubRateLimitsDTO';

import { findNotFollowers, calculateMinutesLeft } from '../../utils/Utils';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import './styles.css';

const Landing: React.FC = () => {
  const [isValidUser, setIsValidUser] = useState<boolean>(false);
  const [rateLimits, setRateLimits] = useState<IGitHubRateLimitsDTO>(
    {} as IGitHubRateLimitsDTO,
  );
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<IGitHubProfileDTO | null>();
  const [following, setFollowing] = useState<IGitHubContactDTO[]>([]);
  const [followers, setFollowers] = useState<IGitHubContactDTO[]>([]);
  const [notFollowers, setNotFollowers] = useState<IGitHubContactDTO[]>([]);

  const { addToast } = useToast();

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      Promise.all([
        api.get(`users/${username}`),
        api.get(`users/${username}/following?per_page=100&page=1`),
        api.get(`users/${username}/followers?per_page=100&page=1`),
      ])
        .then(responses => {
          setProfile(responses[0].data);
          setFollowing(responses[1].data);
          setFollowers(responses[2].data);
          setIsValidUser(true);
        })
        .catch(errors => {
          setProfile(null);
          setFollowing([]);
          setFollowers([]);
          setIsValidUser(false);

          const { status } = errors.response;

          if (status === 403)
            addToast({
              title: 'Requests limit exceeded!',
              description: `You have reached the limit of ${
                rateLimits?.limit
              } requests per hour! Try again in ${calculateMinutesLeft(
                rateLimits.reset,
              )} minutes.`,
              style: 'text-warning',
            });

          if (status === 404)
            addToast({
              title: 'User not found!',
              description: `User "${username}" not found on GitHub!`,
              style: 'text-warning',
            });
        });
    },
    [addToast, rateLimits, username],
  );

  const updateRateLimits = useCallback(() => {
    api.get('rate_limit').then(response => setRateLimits(response.data.rate));
  }, []);

  useEffect(() => {
    updateRateLimits();
  }, [profile, following, followers, updateRateLimits]);

  useEffect(() => {
    const response = findNotFollowers(following, followers);
    setNotFollowers(response);
  }, [following, followers]);

  return (
    <Container fluid>
      <Navbar
        collapseOnSelect
        className="navbar-virtual-width"
        expand="xl"
        fixed="top"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand className="nav-brand" href="#profile">
          GitHub - Follow Me (or Not)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {profile && (
            <Nav className="mr-auto">
              <Nav.Link href="#followers">Followers</Nav.Link>
              <Nav.Link href="#following">Following</Nav.Link>
              <Nav.Link href="#not-following-back">Not following back</Nav.Link>
            </Nav>
          )}
          <Navbar.Text className="ml-auto text-muted">
            {rateLimits && (
              <small>{`Remaining ${rateLimits.remaining} of ${rateLimits.limit}`}</small>
            )}
          </Navbar.Text>
          <Form
            className="ml-auto"
            onSubmit={handleSearch}
            validated={isValidUser}
            noValidate
            inline
          >
            <FormControl
              type="text"
              className="mr-sm-2 user-form-input"
              onChange={e => {
                setUsername(e.target.value);
              }}
              onSubmit={handleSearch}
              placeholder="Enter a GitHub username."
              autoFocus
              required
            />
            <Button
              type="submit"
              className="user-form-button"
              variant="outline-info"
              disabled={!username}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Row className="content-wrapper" md={2} lg={3} xl={4}>
        {profile && (
          <>
            <GitHubUser anchorId="profile" profile={profile} />
            <GitHubContacts
              title="Followers"
              anchorId="followers"
              contacts={followers}
            />
            <GitHubContacts
              title="Following"
              anchorId="following"
              contacts={following}
            />
            <GitHubContacts
              title="Not following back"
              anchorId="not-following-back"
              contacts={notFollowers}
            />
          </>
        )}
      </Row>
    </Container>
  );
};

export default Landing;
