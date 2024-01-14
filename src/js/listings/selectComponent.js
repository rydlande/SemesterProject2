export const createSelectElement = (uniqueTags, fetchData) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('list', 'tags-datalist');
  input.setAttribute('placeholder', 'Search tags');
  input.className =
    'block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50';

  const dataList = document.createElement('datalist');
  dataList.id = 'tags-datalist';

  uniqueTags.forEach((tag) => {
    const option = document.createElement('option');
    option.value = tag;
    dataList.appendChild(option);
  });

  input.addEventListener('input', (event) => {
    const selectedValue = event.target.value;
    fetchData(selectedValue);
  });

  const container = document.getElementById('select-container');
  container.appendChild(input);
  container.appendChild(dataList);
};
