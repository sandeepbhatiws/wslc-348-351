import React from 'react'
import Table from 'react-bootstrap/Table';

export default function UserTable({allUserData, setAllUserData}) {

    const deleteRecord = (index) => {
        if(confirm('Are you sure want to delete ?')){
            allUserData.splice(index,1);
            setAllUserData([...allUserData]);
        }
    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='text-center' width="60px">#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Moblie Number</th>
                        <th className='text-center' width="100px">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (allUserData.length > 0)
                        ?
                            allUserData.map((v,i) => {
                                return(
                                    <tr key={i}>
                                        <td className='text-center'>{i+1}</td>
                                        <td>{ v.name }</td>
                                        <td>{ v.email }</td>
                                        <td>{ v.mobile_number }</td>
                                        <td className='text-center'>
                                            <button className='btn btn-primary' onClick={ () => deleteRecord(i) }>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            
                        :
                            <tr>
                                <td colSpan={5} className='text-center'>No Record Found!!</td>
                            </tr>
                    }
                </tbody>
            </Table>
        </>
    )
}
