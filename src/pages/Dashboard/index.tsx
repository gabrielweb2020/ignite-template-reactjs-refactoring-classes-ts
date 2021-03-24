import api from "../../services/api";

import { Header } from "../../components/Header";
import { Food, FoodData } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    api.get('/foods').then(response => {
      setFoods(response.data);
    });
  }, []);


  async function handleAddFood (food: FoodData) {
    try { 
      const response = await api.post<FoodData>('/foods', {
        ...food,
        available: true
      });

      setFoods([ ...foods,response.data ]);

    } catch (err) {
      console.log('deu erro');
    }
  }

  async function handleUpdateFood (food: Omit<FoodData, 'id' | 'available'>) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
  
    }
      catch (err) {
        console.log('deu erro');
      }
  }

  async function handleDeleteFood (foodId: number) {
    await api.delete(`/foods/${foodId}`);

    const food = foods.filter(food => food.id !== foodId);

    setFoods(food);
  }

  async function handleEditFood (food: FoodData) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  async function toggleModal () {
    setModalOpen(!modalOpen);
  }

  async function toggleEditModal () {
    setEditModalOpen(!editModalOpen);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
