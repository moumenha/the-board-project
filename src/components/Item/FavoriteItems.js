import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Item from "./Item";

const FavoriteItems = ({ docId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
  const getItems = () => {
    db.collection("board").doc(docId).collection('items').where("fav", "==", true).onSnapshot(function (querySnapshot) {
      setItems(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          songName: doc.data().songName,
          songUrl: doc.data().songUrl,
          imageUrl: doc.data().imageUrl,
          mood: doc.data().mood,
          fav: doc.data().fav,
          date: doc.data().date,
        }))
      );
    })
  }
  getItems()
  }, [docId])

  return (
    <div className="col-md-6">
      {items.map((item) => {
        return (
          <Item docId={docId} item={item} items={items} songName={item.songName} itemId={item.id} songUrl={item.songUrl} mood={item.mood} favorite={item.fav} />
        )
      })}

    </div>
  )

}

export default FavoriteItems;