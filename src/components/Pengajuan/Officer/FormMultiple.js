import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    FormFeedback,
    FormGroup,
    Input,
    Table,
} from "reactstrap";

const FormMultiple = ({ loading, handleSubmit, data }) => {
    const [items, setItems] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setItems(data ? data : []);
    }, [data]);

    const handleAddItem = () => {
        setItems([...items, { item_name: "", quantity: "" }]);
        setErrors([...errors, {}]);
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        const newErrors = errors.filter((_, i) => i !== index);
        setItems(newItems);
        setErrors(newErrors);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...items];
        newItems[index][name] = value;

        setItems(newItems);

        const newErrors = [...errors];
        if (name === "item_name" && !value) {
            newErrors[index] = {
                ...newErrors[index],
                [name]: "Item name is required",
            };
        } else if (name === "quantity" && (value <= 0 || isNaN(value))) {
            newErrors[index] = {
                ...newErrors[index],
                [name]: "Quantity must be a positive number",
            };
        } else {
            if (newErrors[index]) {
                delete newErrors[index][name];
            }
        }
        setErrors(newErrors);
    };

    const handleSubmitButton = () => {
        let formValid = true;
        const newErrors = items.map((item) => {
            const error = {};
            if (!item.item_name) {
                formValid = false;
                error.item_name = "Item name is required";
            }
            if (item.quantity <= 0 || isNaN(item.quantity)) {
                formValid = false;
                error.quantity = "Quantity must be a positive number";
            }
            return error;
        });
        setErrors(newErrors);
        if (formValid) {
            handleSubmit(items);
        }
    };

    return (
        <Card className="mt-4">
            <CardHeader>Barang yang diajukan</CardHeader>
            <CardBody>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Nama Barang</th>
                            <th>Jumlah</th>
                            <th>
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={handleAddItem}
                                    disabled={loading}
                                >
                                    +
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((i, k) => {
                            return (
                                <tr key={k}>
                                    <td>
                                        <FormGroup>
                                            <Input
                                                value={i.item_name}
                                                name="item_name"
                                                type="text"
                                                placeholder="Nama Barang"
                                                onChange={(e) =>
                                                    handleChange(k, e)
                                                }
                                                invalid={
                                                    errors[k]?.item_name
                                                        ? true
                                                        : false
                                                }
                                                disabled={loading}
                                            />
                                            <FormFeedback>
                                                {errors[k]?.item_name}
                                            </FormFeedback>
                                        </FormGroup>
                                    </td>
                                    <td>
                                        <FormGroup>
                                            <Input
                                                value={i.quantity}
                                                name="quantity"
                                                type="number"
                                                placeholder="Jumlah"
                                                onChange={(e) =>
                                                    handleChange(k, e)
                                                }
                                                invalid={
                                                    errors[k]?.quantity
                                                        ? true
                                                        : false
                                                }
                                                disabled={loading}
                                            />
                                            <FormFeedback>
                                                {errors[k]?.quantity}
                                            </FormFeedback>
                                        </FormGroup>
                                    </td>
                                    <td>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleRemoveItem(k)}
                                            disabled={loading}
                                        >
                                            Hapus
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
            <CardFooter>
                <Link to={"/pengajuan"} className="btn btn-warning me-1">
                    Kembali
                </Link>
                <Button
                    color="primary"
                    onClick={handleSubmitButton}
                    disabled={loading}
                >
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
};

export default FormMultiple;
