const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
import { responseSendBid } from './singleCard.js';

export default async function bid(URL) {
  const urlBid = URL + '/auction/listings/' + id + '/bids';
  const input = document.querySelector('#inputBid');
  const bid = {
    amount: Number(input.value),
  };
  const res = await fetch(urlBid, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(bid),
  });
  if (!res.ok) {
    const errorRes = await res.json();
    const errorMessage = errorRes.errors[0].message;
    if (
      errorMessage === 'Authorization token is invalid: The token is malformed.'
    ) {
      responseSendBid.innerText = `Only registrerd users can place bids`;
    } else if (errorRes.status === 'Bad Request') {
      responseSendBid.innerText = `${errorMessage}`;
    } else {
      responseSendBid.innerText = `Sorry, there seems to be a problem. Try again in a few minutes. Status code: ${errorMessage}`;
    }
  } else {
    location.reload();
  }
}
