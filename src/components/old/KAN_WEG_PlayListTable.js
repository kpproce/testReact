import React, {useState, useEffect} from 'react';

const PlayListV2 = () => {
  const [data, setData] = useState(null)
  const fetchURL = "http://localhost/php_api_test/apiBasic/read_playlist.php"
  const getData = () =>
    fetch(`${fetchURL}/posts`)
      .then((res) => res.json())

  useEffect(() => {
    getData().then((data) => setData(data))
  }, [])

  return (
    <>
    <h1>Dit scherm is voor de beheerder</h1>
    <h3>http://localhost/php_api_test/apiBasic/read_playlist.php</h3>
    <h3>http://silvermusic.nl/test/apiBasic/read_playlist.php</h3>
    </>
  )
}



export default PlayListV2;