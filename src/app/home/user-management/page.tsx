"use client";
import { AppDispatch, RootState } from "../../store";
import {
  FormData,
  NameTitle,
  Nationality,
  addData,
  initData,
  removeData,
  setData,
  updateData,
} from "../../store/formSlice";
import {
  Button,
  Checkbox,
  CheckboxChangeEvent,
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
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./user-management.module.scss";
import { useTranslations } from "next-intl";

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
  const data = useSelector((state: RootState) => state.form.data);
  const [triggerUpdate, setTriggerUpdate] = useState(0);
  const inputCitizenRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [list, setList] = useState<FormData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("formList") || "[]");
    setList(storedList);
  }, [triggerUpdate]);

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

  const handleSubmit = (value: FormData) => {
    if (data.id) {
      dispatch(updateData({ ...value, id: data.id }));
    } else {
      dispatch(addData(value));
    }

    setTriggerUpdate((prev) => prev + 1);
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    dispatch(removeData(id));
    setTriggerUpdate((prev) => prev + 1);
  };

  const handleEdit = (value: FormData) => {
    dispatch(setData(value));
    form.setFieldsValue({
      ...value,
      birthday: dayjs(value.birthday),
    });
  };

  const handleDeleteSelected = () => {
    selectedRowKeys.forEach((key) => dispatch(removeData(key as string)));
    setTriggerUpdate((prev) => prev + 1);
    setSelectedRowKeys([]);
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
      key: "mobilePhone",
      render: (_: string, __: FormData) => (
        <div>{__.countryCode + __.mobilePhone}</div>
      ),
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "Manage",
      key: "manage",
      render: (_: string, __: FormData) => (
        <Row gutter={2}>
          <Button
            type="link"
            onClick={() => {
              handleEdit(__);
            }}
          >
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(__.id || "")}>
            Delete
          </Button>
        </Row>
      ),
    },
  ];

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allKeys = list.map((item) => item.id || ""); // ใช้ `id` ของข้อมูล
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const rowSelection: TableProps<FormData>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <div className={styles.content}>
      <h1 style={{ margin: 0 }}>Form & Table</h1>
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleSubmit}
        style={{
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid black",
          marginLeft: "100px",
          marginRight: "100px",
        }}
        className={styles.form_content}
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
              <DatePicker format={"DD/MM/YY"} placeholder="mm//dd//yy" />
            </Form.Item>
          </Col>

          <Col span={14}>
            <Form.Item
              name="nationality"
              label="Nationality"
              rules={[{ required: true }]}
            >
              <Select placeholder="-- Please Select --">
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
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            <Form.Item
              name="countryCode"
              label="Mobile phone"
              rules={[{ required: true }]}
            >
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
                  <Button
                    size="small"
                    type="default"
                    onClick={() => {
                      dispatch(initData());
                      form.resetFields();
                    }}
                  >
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
      <Row gutter={2}>
        <Col>
          <Checkbox
            onChange={handleSelectAll}
            checked={selectedRowKeys.length === list.length && list.length > 0}
            indeterminate={
              selectedRowKeys.length > 0 && selectedRowKeys.length < list.length
            }
          >
            Select all
          </Checkbox>
        </Col>
        <Col>
          {" "}
          <Button size="small" type="default" onClick={handleDeleteSelected}>
            Delete
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={list}
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        rowKey={(record) => record.id || ""}
        pagination={{ pageSize: 5, position: ["topRight"] }}
      />
    </div>
  );
}

export default UserManagementPage;
