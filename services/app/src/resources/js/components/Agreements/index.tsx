import * as React from 'react';
import axios from '../../helpers/axios';
import { AgreementType } from '../../helpers/types';
import Table, { TableColumnProps } from '../ui/Table';
import { Box, Button, Grid2, TextField } from '@mui/material';
import FormDialog from '../ui/Dialog';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для навигации

export default function Agreements() {
    const navigate = useNavigate();

    const [data, setData] = React.useState<AgreementType[]>([]);
    const [open, setOpen] = React.useState(false);

    const columns: TableColumnProps[] = [
        {
            name: 'Договор',
            renderCell: (row) => row.id
        },
        {
            name: 'Регион',
            renderCell: (row) => row.region
        },
        {
            name: 'Филиал',
            renderCell: (row) => row.branch
        },
        {
            name: 'Дата начала',
            renderCell: (row) => row.started_at
        },
        {
            name: 'Дата окончания',
            renderCell: (row) => row.finished_at
        },
        {
            name: 'Статус',
            renderCell: (row) => row.status
        },
        {
            name: 'Комментарий',
            renderCell: (row) => row.comment
        },
        {
            name: '',
            renderCell: (row) => <Grid2 container spacing={1}>
                <Grid2>
                    <Button size={'small'} onClick={() => handleView(row.id)}>Просмотреть</Button>
                    <Button size={'small'} onClick={() => handleDelete(row.id)}>Удалить</Button>
                    <Button size={'small'} onClick={() => handleEdit(row)}>Изменить</Button>
                </Grid2>
            </Grid2>
        },
    ];

    const [form, setForm] = React.useState<AgreementType>({
        region: '',
        branch: '',
        status: '',
        started_at: '',
        finished_at: '',
        comment: '',
    });

    const setField = (field) => (event) => {
        setForm({
            ...form,
            [field]: event.target.value
        });
    };

    const updateList = () => {
        axios.get('agreements')
            .then(({data}) => {
                setData(data);
            })
    }

    React.useEffect(updateList, []);

    const handleSave = () => {
        const method = form.id ? 'put' : 'post';
        const url = form.id ? `agreements/${form.id}` : 'agreements';

        axios.request({
            url,
            method,
            data: {
                region: form.region,
                branch: form.branch,
                status: form.status,
                started_at: form.started_at,
                finished_at: form.finished_at,
                comment: form.comment,
            },
        })
            .then(({ status }) => {
                if (status === 200) {
                    updateList();
                }
            });
    }

    const handleDelete = (id) => {
        axios.request({
            url: 'agreements/' + id,
            method: 'DELETE',
        })
            .then(({ status }) => {
                if (status === 200) {
                    updateList();
                }
            });
    }

    const handleEdit = (agreement) => {
        setForm({
            id: agreement.id,
            region: agreement.region,
            branch: agreement.branch,
            status: agreement.status,
            started_at: agreement.started_at,
            finished_at: agreement.finished_at,
            comment: agreement.comment,
        });
        setOpen(true);
    }

    const handleView = (id) => {
        navigate(`/${id}`);
    }

    return <Box sx={{p: 10}}>
        <Box>
            <Box>
                <FormDialog
                    title={'Добавить договор'}
                    buttonText={'Добавить'}
                    onConfirm={handleSave}
                    open={open}
                    setOpen={setOpen}
                >
                    <Grid2 container spacing={2}>
                        <Grid2>
                            <TextField required label={'Регион'} value={form.region} onChange={setField('region')}/>
                        </Grid2>
                        <Grid2>
                            <TextField required label={'Филиал'} value={form.branch} onChange={setField('branch')}/>
                        </Grid2>
                        <Grid2>
                            <TextField required label={'Дата начала'} value={form.started_at} onChange={setField('started_at')}/>
                        </Grid2>
                        <Grid2>
                            <TextField required label={'Дата окончания'} value={form.finished_at} onChange={setField('finished_at')}/>
                        </Grid2>
                        <Grid2>
                            <TextField required label={'Статус'} value={form.status} onChange={setField('status')}/>
                        </Grid2>
                        <Grid2>
                            <TextField label={'Комментарий'} value={form.comment} onChange={setField('comment')}/>
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
