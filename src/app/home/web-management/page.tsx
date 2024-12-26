import { Col, Divider, Row } from "antd";
import React from "react";
import styles from "./web-management.module.scss";

function WebManagementPage() {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
      <Row gutter={12} justify={"end"}>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={styles.arrow_left}></div>
          </div>
        </Col>
        <Col>
          <Row >
            <Col span={12}>
              <div className={styles.button_custom}>
                <div className={styles.arrow_up}></div>
                <div className={styles.arrow_down}></div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={styles.arrow_right}></div>
          </div>
        </Col>
      </Row>

      <Divider/>

      <Row gutter={12} justify={"end"}>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={styles.squares}></div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={styles.circle}></div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={styles.oval}></div>
          </div>
        </Col>
      </Row>

      
      <Row gutter={12} justify={"center"}>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={styles.trapezoid}></div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={styles.rectangle}></div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={styles.parallelogram}></div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default WebManagementPage;
