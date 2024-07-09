import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentedItems, unrentItem } from '../actions/itemActions';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#007bff' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #dee2e6;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#e9ecef'};
  }
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ItemCard = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ItemTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const ItemDescription = styled.p`
  color: #666;
  margin-bottom: 10px;
`;

const ItemImages = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 10px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 4px;
  }
`;

const ItemPrice = styled.p`
  font-weight: bold;
  color: #28a745;
  margin-bottom: 10px;
`;

const RentalInfo = styled.div`
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const RentedItems = () => {
  const dispatch = useDispatch();
  const { rentedItems, loading, error } = useSelector((state) => state.items);
  const auth = useSelector((state) => state.auth);
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    if (auth.userId) {
      dispatch(fetchRentedItems(auth.userId));
    }
  }, [dispatch, auth.userId]);

  const handleUnrent = (itemId) => {
    dispatch(unrentItem(itemId, auth.userId));
  };

  const filteredItems = rentedItems.filter(item => 
    filterRole === 'all' || item.role === filterRole
  );

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Title>Rented Items</Title>
      <FilterButtons>
        <FilterButton active={filterRole === 'all'} onClick={() => setFilterRole('all')}>All</FilterButton>
        <FilterButton active={filterRole === 'owner'} onClick={() => setFilterRole('owner')}>Items I'm Renting Out</FilterButton>
        <FilterButton active={filterRole === 'rentee'} onClick={() => setFilterRole('rentee')}>Items I'm Renting</FilterButton>
      </FilterButtons>
      <ItemList>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard key={item?._id}>
              <ItemTitle>{item?.title}</ItemTitle>
              <ItemDescription>{item?.description}</ItemDescription>
              <ItemImages>
                {item.images && item.images.map((image, index) => (
                  <img key={index} src={image} alt={item.title} />
                ))}
              </ItemImages>
              <ItemPrice>Price: ${item.price}/day</ItemPrice>
              {item.role === 'owner' ? (
                <RentalInfo>
                  <h3>Rented to:</h3>
                  {item.renter.map((rentee, index) => (
                    <div key={index}>
                      <p>Name: {rentee?.userId?.name}</p>
                      <p>Email: {rentee?.userId?.email}</p>
                      <p>Rent Date: {new Date(rentee?.rentDate).toLocaleDateString()}</p>
                      
                    </div>
                  ))}
                </RentalInfo>
              ) : (
                <RentalInfo>
                  <h3>Rented from:</h3>
                  <p>Name: {item?.userId.name}</p>
                  <p>Email: {item?.userId.email}</p>
                  <p>Rent Date: {new Date(item?.renter[0].rentDate).toLocaleDateString()}</p>
                  <ActionButton onClick={() => handleUnrent(item?._id)}>Return Item</ActionButton>
                </RentalInfo>
              )}
            </ItemCard>
          ))
        ) : (
          <p>No rented items found.</p>
        )}
      </ItemList>
    </Container>
  );
};

export default RentedItems;