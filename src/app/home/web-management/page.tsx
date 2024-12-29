"use client";
import { Col, Divider, Row } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./web-management.module.scss";

function WebManagementPage() {
  const [justifyList, setJustifyList] = useState(true);
  const [list1, setList1] = useState([
    {
      id: "squares",
      value: styles.squares,
    },
    {
      id: "circle",
      value: styles.circle,
    },
    {
      id: "oval",
      value: styles.oval,
    },
    {
      id: "trapezoid",
      value: styles.trapezoid,
    },
    {
      id: "rectangle",
      value: styles.rectangle,
    },
    {
      id: "parallelogram",
      value: styles.parallelogram,
    },
  ]);

  const handleClickManagement = (type: string) => {
    if (type === "left") {
      const updateList = [...list1];
      const firstItem = updateList.shift();
      if (firstItem) {
        updateList.push(firstItem);
        setList1(updateList);
      }
    } else if (type === "right") {
      const updateList = [...list1];
      const LastItem = updateList.pop();
      if (LastItem) {
        updateList.unshift(LastItem);
        setList1(updateList);
      }
    } else if (type === "justify") {
      setJustifyList(!justifyList);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
      }}
    >
      <Row gutter={30}>
        <Col span={6}>
          <div
            className={styles.button_border}
            onClick={() => {
              handleClickManagement("left");
            }}
          >
            <div className={styles.arrow_left}></div>
          </div>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <div
                className={styles.button_custom}
                onClick={() => {
                  handleClickManagement("justify");
                }}
              >
                <div className={styles.arrow_up}></div>
                <div className={styles.arrow_down}></div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <div
            className={styles.button_border}
            onClick={() => {
              handleClickManagement("right");
            }}
          >
            <div className={styles.arrow_right}></div>
          </div>
        </Col>
        <Divider />
      </Row>

      <Row gutter={30} justify={justifyList ? "end" : "center"}>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={list1[0]?.value}></div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={list1[1]?.value}></div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={list1[2]?.value}></div>
          </div>
        </Col>
      </Row>

      <Row gutter={30} justify={justifyList ? "center" : "end"}>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={list1[3]?.value}></div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={list1[4]?.value}></div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.button_border}>
            <div className={list1[5]?.value}></div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default WebManagementPage;
