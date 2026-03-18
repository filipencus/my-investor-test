import { useMemo, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import type { FundTableProps, FundTableRow } from "../../../../models/funds.model";
import "./Table.css";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

export default function GenericTable({ data, onBuyAction, onDetailsAction }: FundTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const rows = useMemo(() => {
    if (!data || data.data.length === 0) return [];
    return data.data.map((row: any) => ({
      id: row.id,
      name: row.name,
      type: "Fondos de inversión", // Asumo que el tipo es fijo para el ejemplo
      currency: row.value.currency,
      category: row.category,
      amount: row.value.amount,
    }));
  }, [data]);

  const handleChangePage = (e: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const sortedRows = [...rows].sort((a, b) => {
    const aVal = (a as any)[orderBy];
    const bVal = (b as any)[orderBy];
    return order === "asc" ? (aVal < bVal ? -1 : 1) : aVal > bVal ? -1 : 1;
  });

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleCloseMenu = () => setAnchorEl(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, row: FundTableRow) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const onClickBuyAction = (row: FundTableRow) => {
    const fundData = data?.data.find((r) => r.id === row.id);
    handleCloseMenu();
    onBuyAction(fundData);
  };

  const onClickDetailsAction = (row: FundTableRow) => {
    handleCloseMenu();
    onDetailsAction(row.id);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}>
                  Nombre
                </TableSortLabel>
              </TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "currency"}
                  direction={orderBy === "currency" ? order : "asc"}
                  onClick={() => handleRequestSort("currency")}>
                  Div
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handleRequestSort("category")}>
                  Categoria
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === "amount"}
                  direction={orderBy === "amount" ? order : "asc"}
                  onClick={() => handleRequestSort("amount")}>
                  Liquidado
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} hover>
                <TableCell onClick={() => onClickDetailsAction(row)}>
                  <span className="fund-link">{row.name}</span>
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.currency}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell align="right">${row.amount}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => onClickBuyAction(selectedRow)}>
          <Button variant="text" startIcon={<LoginIcon />}>
            Comprar
          </Button>
        </MenuItem>
        <MenuItem onClick={() => onClickDetailsAction(selectedRow)}>
          <Button variant="text" startIcon={<RemoveRedEyeIcon />}>
            Ver Detalles
          </Button>
        </MenuItem>
      </Menu>
    </Paper>
  );
}
