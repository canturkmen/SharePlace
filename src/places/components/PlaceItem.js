import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Map from "../../shared/components/UIComponents/Map";
import Card from "../../shared/components/UIComponents/Card";
import Modal from "../../shared/components/UIComponents/Modal";
import "./PlaceItem.css";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__content"
        footerClass="place-item__model-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {authCtx.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
            {authCtx.isLoggedIn && <Button danger>DELETE</Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
