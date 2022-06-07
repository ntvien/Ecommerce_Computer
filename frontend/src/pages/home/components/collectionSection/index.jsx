import React from "react";
import CollectionCard from "../../../../components/Card/CollectionCard";
import "./index.css";

export default function CollectionSection() {
  return (
    <div class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-4 col-xs-6">
            <CollectionCard
              name="Laptop"
              imageUrl="https://firebasestorage.googleapis.com/v0/b/web-programing-288db.appspot.com/o/static%2Fshop01.png?alt=media&token=f69af1d3-5614-42e2-b58a-af127c2f973b"
              urlShop="/laptop"
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <CollectionCard
              name="Smartphone"
              imageUrl="https://firebasestorage.googleapis.com/v0/b/web-programing-288db.appspot.com/o/static%2Fshop02.png?alt=media&token=349c00ab-b7a3-443f-8d5f-674234ee62b1"
              urlShop="/smartphone"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
