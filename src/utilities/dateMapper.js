export default function (date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const hour = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
  const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
  return `${date.toLocaleString().split('/')[0]} 
          ${monthNames[date.getMonth()]} ${date.getUTCFullYear()}
        - ${hour}:${minutes}`
}