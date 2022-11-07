import defaultAvatar from '/static/placeholder.png';
export default function getAvatar(user: User | null) {
  return user?.avatar ? `${process.env.API_ENDPOINT}/resources${user?.avatar}`: defaultAvatar;
}
