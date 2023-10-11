import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

function App() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("https://wolnelektury.pl/api/collections/")
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Something went wrong')
      })
      .then(data => setCategories(data))
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function handleClick(dataHref) {
    fetch(dataHref)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Something went wrong')
      })
      .then(data => {
        if (data.books) {
          setCategories(data.books)
        } else {
          setCategories([data])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <div className="main--wrapper">{categories.map(category => {
        return (
          <div key={nanoid()} className="wrapper" onClick={() => handleClick(category.href)}>
            <div className="header">
              <div className="header--subhead">
                <h6 className="header--subhead--h6">{category.title}</h6>
              </div>
            </div>
            {category.simple_thumb && <div className="wrapper--image" style={{ background: `url(${category.simple_thumb}), lightgray 50% / cover no-repeat` }}></div>}
            <div className="wrapper--buttons">
              {category.pdf && <a href={category.pdf} target="_blank"><div className="wrapper--buttons--button">pdf</div></a>}
              {category.epub && <a href={category.epub} target="_blank"><div className="wrapper--buttons--button">epub</div></a>}
              {category.mobi && <a href={category.mobi} target="_blank"><div className="wrapper--buttons--button">mobi</div></a>}
              {category.txt && <a href={category.txt} target="_blank"><div className="wrapper--buttons--button">txt</div></a>}
            </div>
          </div>
        )
      })}</div>
    </>
  )
}

export default App
