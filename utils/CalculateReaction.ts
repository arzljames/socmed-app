const CalculateReaction = (
  reactions: Array<any>,
  initialReaction: Boolean
): string => {
  const users: number = reactions.length;

  if (users <= 0) return "0 reaction";
  if (users === 1) return `${users} reacts to this`;
  if (users > 1) return `${users} react to this`;
  if (users > 0 && initialReaction) return `You and ${users - 1} react to this`;
};

export default CalculateReaction;
