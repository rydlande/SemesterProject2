const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

export default async function bid(URL) {
  const urlBid = URL + '/auction/listings/' + id + '/bids';
  console.log(urlBid);
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
  const data = await res.json();
  console.log(data);
}
