export default function closePopup(...names: string[]) {

  return (e: Event) => {
      if (e.target.classList[0] === 'popup') {
        names.forEach(value => {
          window.store.dispatch({[value]: false})
        });
      }
    }
}
