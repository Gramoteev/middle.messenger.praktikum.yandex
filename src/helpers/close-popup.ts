
export default function closePopup(...names: string[]) {

  return (e: Event) => {
    const target = e.target as Element;
    if (target.classList[0] === 'popup') {
      names.forEach(value => {
        window.store.dispatch({[value]: false})
      });
    }
    }
}
