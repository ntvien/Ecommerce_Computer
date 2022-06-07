import React from "react";
import "./index.css";
import { Button, Modal } from "react-bootstrap";
export default function ModalOrder({ show, handleShow, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleShow}
      animation={true}
      dialogClassName="modal-confirm"
    >
      <Modal.Header>
        <Modal.Title>
          <div class="icon-box">
            <i class="fa fa-check" aria-hidden="true"></i>
          </div>
          <h4 class="modal-title w-100">Thành công!</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p class="text-center">
          Đơn đặt hàng đã được xác nhận. Kiểm tra email để biết chi tiết.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-success btn-block" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
