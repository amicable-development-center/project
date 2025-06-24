import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore/lite";
import { useState } from "react";

const useProjectPageNation = ({
  lastVisible,
}: {
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}) => {
  const [pageStack, setPageStack] = useState<
    (QueryDocumentSnapshot<DocumentData> | null)[]
  >([null]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = (): void => {
    if (lastVisible) {
      if (currentPage === pageStack.length - 1) {
        setPageStack((prev) => [...prev, lastVisible]);
      }
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    currentPage,
    handle: {
      prev: handlePrevious,
      next: handleNext,
    },
  };
};

export default useProjectPageNation;
