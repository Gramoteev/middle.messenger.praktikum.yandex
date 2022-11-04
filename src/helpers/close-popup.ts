export default function closePopup(props: Indexed, ...titles: string[]) {
  return (e: Event) => {
      if (e.target.classList[0] === 'popup') {
        titles.forEach(value => {
          props[value] = false;
        });
      }
    }
}
