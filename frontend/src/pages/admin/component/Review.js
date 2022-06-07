import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import columns from '../../../util/reviews/columnTable';
import communityApi from '../../../apis/community';


export default function Review() {
    const [reviewStates, setReviewStates] = useState({ reviews: [], page: 0, size: 10000 });
    const [listCellDelete, setListCellDelete] = useState([])

    useEffect(() => {
        fetchReviews();
    }, []);
    const fetchReviews = () => {
        const { reviews, page, size } = reviewStates;
        communityApi.getReviewsInAdmin({ page: page, size: size }).then(res => {
            setReviewStates({
                reviews: res.map(review => ({ ...review, id: review.review_id })),
                page: page,
                size: size
            })
        })
    }
    console.log(reviewStates.reviews)
    const onSelect = (ListCell) => {
        setListCellDelete([...ListCell])
    }
    const onDelete = () => {
        communityApi.deleteReviews({ ids: listCellDelete }).catch(e => console.log(e));
        setReviewStates(old => ({
            ...old,
            reviews: [...old.reviews.filter(reviews => !listCellDelete.includes(reviews.id))],
        }))
        setListCellDelete([]);

    }
    return (
        <div style={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={reviewStates.reviews}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(a) => onSelect(a)}

            />
            <Stack marginTop={5} justifyContent="flex-end" direction="row" spacing={5}>
                <Button
                    hidden={listCellDelete.length <= 0}
                    variant="outlined"
                    startIcon={<DeleteIcon
                    />}
                    onClick={onDelete}
                >
                    Xoá
                </Button>


            </Stack>

        </div>
    );
}