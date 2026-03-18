import { useEffect, useState } from "react";
import type { TransactionEvent, NewEventInput } from "../models/hooks.model";

const STORAGE_KEY = "transactions-funds";

export function useTransactionEvents() {
  const [events, setEvents] = useState<TransactionEvent[]>(() => {
    if (!window) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const registerEvent = ({ typeOfEvent, amount, fundName }: NewEventInput) => {
    const newEvent: TransactionEvent = {
      id: Date.now(),
      typeOfEvent,
      amount,
      fundName,
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  useEffect(() => {
    if (!window) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  return {
    events,
    registerEvent,
  };
}
