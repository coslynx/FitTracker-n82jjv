"use client";

import { useState, useEffect } from "react";
import { Modal as BaseModal } from "react-bootstrap";
import { useStore } from "@/hooks/useGoals";
import { deleteGoal } from "@/api/goals";
import { toast } from "react-hot-toast";

interface ModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  goalId: string;
}

const Modal = ({ show, setShow, goalId }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { goals, setGoals } = useStore();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteGoal(goalId);
      setGoals(goals.filter((goal) => goal.id !== goalId));
      toast.success("Goal deleted successfully!");
      setShow(false);
    } catch (error) {
      toast.error("Failed to delete goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal show={show} onHide={() => setShow(false)}>
      <BaseModal.Header closeButton>
        <BaseModal.Title>Delete Goal</BaseModal.Title>
      </BaseModal.Header>
      <BaseModal.Body>
        Are you sure you want to delete this goal? This action cannot be undone.
      </BaseModal.Body>
      <BaseModal.Footer>
        <button
          onClick={() => setShow(false)}
          className="btn btn-secondary me-2"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </BaseModal.Footer>
    </BaseModal>
  );
};

export default Modal;