import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import classes from './App.module.css'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'
import image from './Content/images/back1.jpg'
import ReactTooltip from "react-tooltip";


const App = () => {
  const [contact, setcontact] = useState([])
  const [originalContact, setoriginalContact] = useState([])
  const [inputName, setinputName] = useState('')
  const [activePage, setactivePage] = useState(1)
  const [perpage, setperpage] = useState(4)
  const [sortClicked, setsortClicked] = useState(false)
  useEffect(() => {

    var temp = [
      { "name": "Rahul Gupta", "isfavorite": true },
      { "name": "Shivangi Sharma", "isfavorite": false },
      { "name": "Akash Singh", "isfavorite": true },
      { "name": "ABC", "isfavorite": false },
      { "name": "DEF", "isfavorite": false },
      { "name": "GHI", "isfavorite": false },
      { "name": "JKL", "isfavorite": false },
      { "name": "MNO", "isfavorite": false },
      { "name": "PQR", "isfavorite": false },
      { "name": "STU", "isfavorite": false },
      { "name": "VWX", "isfavorite": false }
    ]
    // setcontact(temp)
    setoriginalContact(temp)
    setactivePage(1)
    const offset = (0) * perpage
    const data1 = temp
    const upperlimit = offset + perpage
    const slice = data1.slice(offset, upperlimit)
    setcontact(slice)

  }, [])

  const favoriteClicked = (e, item, index, method) => {
    // var temp = contact
    // temp[index].isfavorite = true
    // setcontact(temp)
    item.isfavorite = method === 'select' ? true : false
    const offset = (activePage - 1) * perpage
    const data1 = originalContact
    const upperlimit = offset + perpage
    const slice = data1.slice(offset, upperlimit)
    setcontact(slice)

  }
  const deleteHandler = (e, item, index) => {
    if (window.confirm("Are you sure you want to delete contact ?")) {
      var temp = originalContact
      var list = []
      temp.map(data => {
        if (data.name !== item.name) {
          list.push(data)
        }
      })
      // setcontact(list)
      setoriginalContact(list)
      const offset = (activePage - 1) * perpage
      const data1 = list
      const upperlimit = offset + perpage
      const slice = data1.slice(offset, upperlimit)
      setcontact(slice)
    }

  }
  const submitHandler = (e, method) => {
    // var temp = contact
    // temp.push({ "name": e.target.value, "isfavorite": false })
    if (e.key === "Enter" || method === "buttonpress") {
      if (method === "buttonpress") {
        if (inputName !== '') {
          setcontact([...contact, { "name": inputName, "isfavorite": false }])
          setoriginalContact([...contact, { "name": inputName, "isfavorite": false }])

        }
        else {
          toast.info("Please enter name to add to list")
        }
      }
      else {
        // setcontact([...contact, { "name": e.target.value, "isfavorite": false }])
        // setoriginalContact([...contact, { "name": e.target.value, "isfavorite": false }])
        var temp = [{ "name": e.target.value, "isfavorite": false }]
        originalContact.map(item => (
          temp.push(item)
        ))
        const offset = (activePage - 1) * perpage
        const data1 = temp
        const upperlimit = offset + perpage
        const slice = data1.slice(offset, upperlimit)
        setcontact(slice)
        setoriginalContact(temp)
        setinputName("")
        document.getElementById('new_contact').value = ""
      }


    }
  }
  const handlePageChange = (e) => {
    setactivePage(e)
    const offset = (e - 1) * perpage
    const data1 = originalContact
    const upperlimit = offset + perpage
    const slice = data1.slice(offset, upperlimit)
    setcontact(slice)
  }
  const handleChange = (e) => {
    console.log(originalContact)
    if (e.target.value === '') {
      // setcontact(originalContact)
      const offset = (activePage - 1) * perpage
      const data1 = originalContact
      const upperlimit = offset + perpage
      const slice = data1.slice(offset, upperlimit)
      setcontact(slice)
    }
    else {
      var input = e.target.value
      var list = []
      var length = originalContact.length
      for (var i = 0; i < length; i++) {
        // console.log(originalContact[i].name)
        // console.log(i)
        if (originalContact[i].name.toLowerCase().includes(input.toLowerCase())) {
          list.push(originalContact[i])
        }
      }
      // setcontact(list)
      const offset = (activePage - 1) * perpage
      const data1 = list
      const upperlimit = offset + perpage
      const slice = data1.slice(offset, upperlimit)
      setcontact(slice)
    }
  }
  const sortData = (e) => {
    setsortClicked(!sortClicked)

    var temp = originalContact
    var first = []
    var second = []
    temp.map(item => {
      if (item.isfavorite) {
        first.push(item)
      }
      else {
        second.push(item)
      }
    })
    second.map(item => (
      first.push(item)
    ))
    const offset = (activePage - 1) * perpage
    const data1 = first
    const upperlimit = offset + perpage
    const slice = data1.slice(offset, upperlimit)
    setcontact(slice)
    setoriginalContact(first)
    // setcontact(first)
  }
  return (
    <div className="App">
      <div className="container">
        <input className={classes['search-bar']} onChange={e => handleChange(e)} placeholder="Search by name" type="text" /><br />
        <div className={classes['Name-Box']}>
          <div className={classes['Name-Title']}>
            <span className={classes['Name-Title-Text']}>Friends List</span>
            <i data-tip data-for="sort" title="sort by favorites" style={{ cursor: 'pointer', fontSize: "large", color: " white", marginLeft: "51%" }} onClick={e => sortData(e)} class={sortClicked ? "fa fa-sort" : "fa fa-sort spin-effect fa-rotate-180"}></i><br />
            <ReactTooltip id="sort" type="info">
              <span>Sort the list by favorites</span>
            </ReactTooltip>
          </div>
          <div className={classes['Input-Form']}>
            <input id="new_contact" placeholder="Enter your friend's name" className={classes['input-box']} type="text" onChange={e => setinputName(e.target.value)} onKeyDown={e => submitHandler(e)} />
            {/* <i className="fa fa-plus" onClick={e => submitHandler(e, "buttonpress")}></i> */}
          </div>
          <hr />
          {console.log(contact)}
          {
            contact.map((item, index) => (
              <>
                <div className={classes['Name-card']}>
                  <div className={classes['Name-contact']}>
                    <span><b>{item.name}</b></span>
                    <span className={classes['subtext']}>is your friend</span>
                  </div>
                  <div className={classes['Name-action']}>

                    {/* <input defaultChecked={item.isfavorite} onChange={e => favoriteClicked(e, item, index)} type="checkbox" className={classes['Name-star']} /> */}
                    {item.isfavorite === true ?
                      <>
                        <div onClick={e => favoriteClicked(e, item, index, "unselect")} className={classes['Name-star1']} >
                        </div>
                       
                      </>
                      :
                      <>
                        <div  onClick={e => favoriteClicked(e, item, index, "select")} className={classes['Name-star']} >
                        </div>
                        
                      </>
                    }



                    <div className={classes['Name-delete']}>
                      <i data-tip data-for="delete" onClick={e => deleteHandler(e, item, index)} style={{ color: '#393186', fontSize: '20px', cursor: 'pointer' }} class="fa fa-trash"></i>
                    </div>
                    <ReactTooltip id="delete" type="error">
                      <span>Click to delete contact from list</span>
                    </ReactTooltip>
                  </div>
                </div>
                <hr />
              </>
            ))
          }
          <Pagination
            activePage={activePage}
            itemsCountPerPage={perpage}
            totalItemsCount={originalContact.length}
            pageRangeDisplayed={3}
            onChange={e => handlePageChange(e)}
            itemClass="page-item"
            linkClass="page-link"

          />


        </div>
      </div>
    </div>
  );
}

export default App;
