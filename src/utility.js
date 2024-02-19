
export function getCurrentDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

// unnecessary at the moment
export const handleScroll = (ref) => {
  ref.current.scrollIntoView({ behavior: 'smooth' });
};


export function parseDate(date = new Date()) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
  let day = date.getDate().toString().padStart(2, '0');
  return `${month}-${day}-${year}`;
}


export function getPreviousTemps(days_ago){
  let cur = getCurrentDateString()

  let year = cur.slice(0,4)
  let month = cur.slice(4,6)
  let day = cur.slice(6,8)
  
  if (day - days_ago < 1){
    month = parseInt(month) - 1
    if (month < 10){
      month = `0${month}`
    }

    day = 30 + (day - days_ago)
  }

  
  let prev_day = parseInt(day) - days_ago
  console.log( `${year}${month}${prev_day}`)

  
  return `${year}${month}${prev_day}`
}

