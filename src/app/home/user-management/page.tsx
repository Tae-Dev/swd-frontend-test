"use client";
import { AppDispatch } from "@/app/store";
import {
  addData,
  removeData,
  FormData,
  NameTitle,
  Nationality,
} from "@/app/store/formSlice";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Table,
  TableProps,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./user-management.module.scss";

const { Option } = Select;

const nameTitleList = [
  {
    title: "Mr.",
    value: NameTitle.Mr,
  },
  {
    title: "Ms.",
    value: NameTitle.Ms,
  },
  {
    title: "Mrs.",
    value: NameTitle.Mrs,
  },
];

const nationalityList = [
  {
    title: "Thai",
    value: Nationality.Thai,
  },
  {
    title: "French",
    value: Nationality.French,
  },
  {
    title: "American",
    value: Nationality.American,
  },
];

const countryOptions = [
  {
    value: "+66",
    label: <span>TH +66</span>,
  },
  {
    value: "+1",
    label: <span>US +1</span>,
  },
  {
    value: "+33",
    label: <span>FR +33</span>,
  },
];

function UserManagementPage() {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const [triggerUpdate, setTriggerUpdate] = useState(0);
  const inputCitizenRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [list, setList] = useState<FormData[]>([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("formList") || "[]");
    setList(storedList);
  }, [triggerUpdate]);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  const handleInputChange =
    (index: number, maxLength: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length === maxLength && inputCitizenRefs.current[index + 1]) {
        inputCitizenRefs.current[index + 1]?.focus();
      } else if (value.length === 0 && inputCitizenRefs.current[index - 1]) {
        inputCitizenRefs.current[index - 1]?.focus();
      }
    };

  const handleSubmit = (values: any) => {
    dispatch(addData(values));
    setTriggerUpdate((prev) => prev + 1);
    form.resetFields();
  };

  const handleDelete = (index: number) => {
    dispatch(removeData(index));
    setTriggerUpdate((prev) => prev + 1);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (_: string, record: FormData) =>
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Mobile Phone",
      dataIndex: "mobilePhone",
      key: "mobilePhone",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "Manage",
      key: "manage",
      render: (_: string, __: FormData, index: number) => (
        <Row gutter={2}>
          <Button type="link" onClick={() => {}}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(index)}>
            Delete
          </Button>
        </Row>
      ),
    },
  ];

  const rowSelection: TableProps<FormData>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: FormData[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <div className={styles.content}>
      <h1>Form & Table</h1>
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleSubmit}
        style={{
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid black",
        }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Select placeholder="Title">
                {nameTitleList.map((title, i) => (
                  <Option key={i} value={title.value}>
                    {title.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="birthday"
              label="Birthday"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col span={14}>
            <Form.Item
              name="nationality"
              label="Nationality"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Nationality">
                {nationalityList.map((nationality, i) => (
                  <Option key={i} value={nationality.value}>
                    {nationality.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col>
            <Form.Item label="CitizenID">
              <Row gutter={8}>
                <Col span={2}>
                  <Form.Item name={["citizenID", "part1"]} noStyle>
                    <Input
                      onChange={handleInputChange(0, 1)}
                      ref={(el: any) => (inputCitizenRefs.current[0] = el)}
                      maxLength={1}
                      className={styles.centered_input}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name={["citizenID", "part2"]} noStyle>
                    <Input
                      onChange={handleInputChange(1, 4)}
                      ref={(el: any) => (inputCitizenRefs.current[1] = el)}
                      maxLength={4}
                      className={styles.centered_input}
                    />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name={["citizenID", "part3"]} noStyle>
                    <Input
                      onChange={handleInputChange(2, 5)}
                      ref={(el: any) => (inputCitizenRefs.current[2] = el)}
                      maxLength={5}
                      className={styles.centered_input}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name={["citizenID", "part4"]} noStyle>
                    <Input
                      onChange={handleInputChange(3, 2)}
                      ref={(el: any) => (inputCitizenRefs.current[3] = el)}
                      maxLength={2}
                      className={styles.centered_input}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item name={["citizenID", "part5"]} noStyle>
                    <Input
                      onChange={handleInputChange(4, 1)}
                      ref={(el: any) => (inputCitizenRefs.current[4] = el)}
                      maxLength={1}
                      className={styles.centered_input}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Radio.Group style={{ display: "flex", gap: 10 }}>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Unisex">Unisex</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="countryCode" label="Mobile phone" rules={[{ required: true }]}>
              <Select>
                {countryOptions.map((country, i) => (
                  <Option key={i} value={country.value}>
                    {country.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col style={{ marginTop: 4 }}>-</Col>
          <Col>
            <Form.Item name={"mobilePhone"} noStyle>
              <Input className={styles.centered_input} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col>
            <Form.Item name="passportNo" label="Passport No">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col>
            <Form.Item
              name="expectedSalary"
              label="Expected Salary"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Row gutter={40}>
                <Col>
                  <Button size="small" type="default" htmlType="submit">
                    Reset
                  </Button>
                </Col>
                <Col>
                  <Button size="small" type="default" htmlType="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
      
        dataSource={list}
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        columns={columns}
        rowKey={(_, index) => (index as number).toString()}
        pagination={{ pageSize: 5, position: ['topRight'] }}
      />
    </div>
  );
}

export default UserManagementPage;
