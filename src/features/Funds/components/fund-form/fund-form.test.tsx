import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, it, expect, vi, afterEach } from "vitest";
import { renderWithQueryClient } from "../../../../test/helpers";
import { mockFundDetails } from "../../../../models/tests.model";
import GenericFundForm from "./fund-form";
import { FundActionType } from "../../../../models/funds.model";

const {
  mockPurchaseMutate,
  mockSellMutate,
  mockTransferMutate,
  mockRegisterEvent,
  purchaseState,
  sellState,
  transferState,
  portfolioFundsState,
} = vi.hoisted(() => ({
  mockPurchaseMutate: vi.fn(),
  mockSellMutate: vi.fn(),
  mockTransferMutate: vi.fn(),
  mockRegisterEvent: vi.fn(),
  purchaseState: {
    isPending: false,
    isError: false,
    error: null as Error | null,
  },
  sellState: {
    isPending: false,
    isError: false,
    error: null as Error | null,
  },
  transferState: {
    isPending: false,
    isError: false,
    error: null as Error | null,
  },
  portfolioFundsState: {
    data: [] as Array<{
      id: string;
      name: string;
      quantity: string;
      totalValue: { amount: number; currency: string };
    }>,
  },
}));

type MutationMockState = {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

function createMutationHookMock(mutate: ReturnType<typeof vi.fn>, state: MutationMockState) {
  return {
    default: () => ({
      mutate,
      isPending: state.isPending,
      isError: state.isError,
      error: state.error,
    }),
  };
}

vi.mock("../../../../hooks/useFundPurchase", () =>
  createMutationHookMock(mockPurchaseMutate, purchaseState),
);
vi.mock("../../../../hooks/useFundSell", () => createMutationHookMock(mockSellMutate, sellState));
vi.mock("../../../../hooks/useFundTransfer", () =>
  createMutationHookMock(mockTransferMutate, transferState),
);
vi.mock("../../../../hooks/useOrdersHistory", () => ({
  useTransactionEvents: () => ({
    registerEvent: mockRegisterEvent,
    events: [],
  }),
}));
vi.mock("../../../../hooks/usePortfolioFunds", () => ({
  usePortfolioFunds: () => ({
    data: portfolioFundsState.data,
  }),
}));

describe("GenericFundForm", () => {
  const mockClose = vi.fn();
  const testFund = {
    ...mockFundDetails,
    name: "Fondo de prueba",
    value: { amount: 100, currency: "EUR" },
    totalValue: { amount: 750, currency: "EUR" },
  };

  const renderForm = (action: string, fundDetails: any = testFund) => {
    return renderWithQueryClient(
      <GenericFundForm config={{ action }} fundDetails={fundDetails} shouldClose={mockClose} />,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    purchaseState.isPending = false;
    purchaseState.isError = false;
    purchaseState.error = null;
    sellState.isPending = false;
    sellState.isError = false;
    sellState.error = null;
    transferState.isPending = false;
    transferState.isError = false;
    transferState.error = null;
    portfolioFundsState.data = [
      {
        id: testFund.id,
        name: testFund.name,
        quantity: "3",
        totalValue: { amount: 300, currency: "EUR" },
      },
      {
        id: "fund-destination",
        name: "Fondo destino",
        quantity: "2",
        totalValue: { amount: 200, currency: "EUR" },
      },
    ];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should display total value for sell action", () => {
    renderForm(FundActionType.SELL);
    expect(screen.getByText(/750/i)).toBeInTheDocument();
  });

  it("should render hook error message", () => {
    purchaseState.isError = true;
    purchaseState.error = new Error("Error del servidor");
    renderForm(FundActionType.BUY);
    expect(screen.getByText(/error del servidor/i)).toBeInTheDocument();
  });

  it("should show pending state", () => {
    purchaseState.isPending = true;
    renderForm(FundActionType.BUY);
    expect(screen.getByRole("status")).toHaveTextContent(/procesando acción/i);
  });

  it("should render buy form with fund information and amount input", () => {
    renderForm(FundActionType.BUY);

    expect(screen.getByText(/^fondo:/i)).toBeInTheDocument();
    expect(screen.getByText(/fondo de prueba/i)).toBeInTheDocument();
    expect(screen.getByText(/valor actual/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/EUR/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/0,00/i);
    expect(input).toBeInTheDocument();
    expect(screen.getByLabelText(/importe/i)).toBeInTheDocument();
    expect(screen.getByText(/€/i)).toBeInTheDocument();
  });

  it("should show amount validation errors", async () => {
    renderForm(FundActionType.BUY);

    await userEvent.click(screen.getByRole("button", { name: /continuar/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/monto es obligatorio/i);
    expect(mockPurchaseMutate).not.toHaveBeenCalled();

    await userEvent.type(screen.getByLabelText(/importe/i), "10001");
    await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/10.000/i);
    expect(mockPurchaseMutate).not.toHaveBeenCalled();
  });

  it("should call purchase mutation with parsed amount", async () => {
    renderForm(FundActionType.BUY);
    await userEvent.type(screen.getByLabelText(/importe/i), "125");
    await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

    expect(mockPurchaseMutate).toHaveBeenCalledWith(
      { fundId: testFund.id, amount: 125 },
      expect.objectContaining({ onSuccess: expect.any(Function), onError: expect.any(Function) }),
    );
  });

  it("should call sell mutation for sell action", async () => {
    renderForm(FundActionType.SELL);

    await userEvent.type(screen.getByLabelText(/importe/i), "80");
    await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

    expect(mockSellMutate).toHaveBeenCalledWith(
      { fundId: testFund.id, amount: 80 },
      expect.objectContaining({ onSuccess: expect.any(Function), onError: expect.any(Function) }),
    );
  });

  it("should render transfer target select and require destination on submit", async () => {
    renderForm(FundActionType.TRANSFER);

    expect(screen.getByLabelText(/fondo destino/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /fondo destino/i })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /fondo de prueba/i })).not.toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/importe/i), "50");
    await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

    expect(await screen.findByText(/selecciona un fondo destino/i)).toBeInTheDocument();
    expect(mockTransferMutate).not.toHaveBeenCalled();
  });

  it("should call transfer mutation when target is selected", async () => {
    renderForm(FundActionType.TRANSFER);

    await userEvent.selectOptions(screen.getByLabelText(/fondo destino/i), "fund-destination");
    await userEvent.type(screen.getByLabelText(/importe/i), "40");
    await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

    expect(mockTransferMutate).toHaveBeenCalledWith(
      { amount: 40, fromFundId: testFund.id, toFundId: "fund-destination" },
      expect.objectContaining({ onSuccess: expect.any(Function), onError: expect.any(Function) }),
    );
  });

  it("should show success message, register event and schedule modal close", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    mockPurchaseMutate.mockImplementation((_, options) => {
      options.onSuccess();
    });

    renderForm(FundActionType.BUY);
    await userEvent.type(screen.getByLabelText(/importe/i), "60");
    await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/éxito/i);
    expect(mockRegisterEvent).toHaveBeenCalledWith({
      typeOfEvent: FundActionType.BUY,
      fundName: testFund.name,
      amount: 60,
    });
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    expect(mockClose).not.toHaveBeenCalled();

    setTimeoutSpy.mockRestore();
  });

  it("should show custom error message when mutation fails", async () => {
    mockPurchaseMutate.mockImplementation((_, options) => {
      options.onError({ error: "Error de compra" });
    });

    renderForm(FundActionType.BUY);
    await userEvent.type(screen.getByLabelText(/importe/i), "60");
    await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

    expect(await screen.findByText(/error de compra/i)).toBeInTheDocument();
  });
});
