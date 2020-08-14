import IGitHubContactDTO from '../dtos/IGitHubContactDTO';

/// Helper function to find who is not following back.
const comparer = (otherArray: IGitHubContactDTO[]) => {
  return (current: IGitHubContactDTO) => {
    return otherArray.filter(other => other.id === current.id).length === 0;
  };
};

export const findNotFollowers = (
  following: IGitHubContactDTO[],
  followers: IGitHubContactDTO[],
): IGitHubContactDTO[] => following.filter(comparer(followers));

export const calculateMinutesLeft = (epoch: number): number => {
  const convertedDate = new Date(epoch * 1000);
  const now = new Date();
  return Math.ceil((convertedDate.getTime() - now.getTime()) / 60000);
};
