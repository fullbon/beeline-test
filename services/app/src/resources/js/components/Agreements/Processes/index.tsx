import * as React from 'react';
import axios from '../../../helpers/axios';
import { ProcessType } from '../../../helpers/types';
import Table, { TableColumnProps } from '../../ui/Table';
import { Box, Button, Grid2, TextField } from '@mui/material';
import FormDialog from '../../ui/Dialog';
import { useNavigate, useParams } from 'react-router-dom';

export default function Processes() {
    const {id} = useParams();
    console.log({ id });

    const [data, setData] = React.useState<ProcessType[]>([]);
    const [open, setOpen] = React.useState(false);

    const columns: TableColumnProps[] = [
        {
            name: 'Договор',
            renderCell: (row) => row.id
        },
        {
            name: 'Процесс',
            renderCell: (row) => row.name
        },
        {
            name: 'Стоимость',
            renderCell: (row) => row.price
        },
        {
            name: '',
            renderCell: (row) => <Grid2 container spacing={1}>
                <Grid2>
                    <Button size={'small'} onClick={() => handleDelete(row.id)}>Удалить</Button>
                    <Button size={'small'} onClick={() => handleEdit(row)}>Изменить</Button>
                </Grid2>
            </Grid2>
        },
    ];

    const [form, setForm] = React.useState<ProcessType>({
        agreement_id: id ?? '',
        name: '',
        price: ''
    });

    const setField = (field) => (event) => {
        setForm({
            ...form,
            [field]: event.target.value
        });
    };

    const updateList = () => {
        axios.get('agreements/processes/' + id)
            .then(({data}) => {
                setData(data);
            })
    }

    React.useEffect(updateList, []);

    const handleSave = () => {
        const method = form.id ? 'put' : 'post';
        const url = form.id ? `processes/${form.id}` : 'processes';

        axios.request({
            url,
            method,
            data: form,
        })
            .then(({ status }) => {
                if (status === 200) {
                    updateList();
                }
            });
    }

    const handleDelete = (id) => {
        axios.request({
            url: 'processes/' + id,
            method: 'DELETE',
        })
            .then(({ status }) => {
                if (status === 200) {
                    updateList();
                }
            });
    }

    const handleEdit = (process) => {
        setForm(process);
        setOpen(true);
    }

    return <Box sx={{p: 10}}>
        <Box>
            <Box>
                <FormDialog
                    title={'Добавить процесс'}
                    buttonText={'Добавить'}
                    onConfirm={handleSave}
                    open={open}
                    setOpen={setOpen}
                >
                    <Grid2 container spacing={2}>
                        <Grid2>
                            <TextField required label={'Процесс'} value={form.name} onChange={setField('name')}/>
                        </Grid2>
                        <Grid2>
                            <TextField required label={'Стоимость'} value={form.price} onChange={setField('price')}/>
                        </Grid2>
                    </Grid2>
                </FormDialog>
            </Box>
        </Box>
        <Box>
            <Table
                columns={columns}
                rows={data}
            />
        </Box>
    </Box>
}
