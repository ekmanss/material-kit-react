import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useBacktests } from 'src/hooks/useBacktests';
import { fDateTime } from 'src/utils/format-time';
import Label from 'src/components/label';

export default function BacktestsView() {
  const { kolId } = useParams();
  const { data, isLoading, isError, error } = useBacktests(kolId);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log('BacktestsView rendered', { kolId, data, isLoading, isError, error });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }
  const mock_data = {
    "max_score": 85,
    "min_score": 82,
    "kol_info": {
      "id": 1,
      "twitter": "@kol_king",
      "name": "kol_king",
      "description": "first kol",
      "star": "5",
      "recommend": "1",
      "score": "66",
      "photo": "https://pbs.twimg.com/profile_images/1781374522966601732/HA_dnDvL_400x400.jpg",
      "language": "en",
      "key_words": [
        "中文"
      ],
      "recommend_token": [
        {
          "token_symbol": "PEPE",
          "token_address": "0x6982508145454ce325ddbe47a25d4ec3d2311933"
        },
        {
          "token_symbol": "MOG",
          "token_address": "0xaaee1a9723aadb7afa2810263653a34ba2c21c7a"
        }
      ]
    },
    "score_list": [
      {
        "time_stamp": 1717516800,
        "score": "82"
      },
      {
        "time_stamp": 1718380800,
        "score": "85"
      }
    ],
    "kol_backtest_results": [
      {
        "id": 1,
        "kol_id": 1,
        "token_address": "0xa43fe16908251ee70ef74718545e4fe6c5ccec9f",
        "token_name": "PEPE",
        "token_logo": "https://www.geckoterminal.com/_next/image?url=https%3A%2F%2Fcoin-images.coingecko.com%2Fcoins%2Fimages%2F29850%2Fsmall%2Fpepe-token.jpeg%3F1696528776&w=32&q=75",
        "time_stamp": 1717516800,
        "call_time": 1717171200,
        "high_time": 1717948800,
        "low_time": 1717689600,
        "call_price": "1.2",
        "high_price": "1.5",
        "low_price": "1.1",
        "more_change": "0.2",
        "less_change": "0.1",
        "harvest_duration": "3",
        "current_price": "1.4",
        "current_marketcap": "300000000",
        "score": "82",
        "type": "meme",
        "btc_more_change": "0.01"
      },
      {
        "id": 2,
        "kol_id": 1,
        "token_address": "0xa43fe16908251ee70ef74718545e4fe6c5ccec9f",
        "token_name": "PEPE",
        "token_logo": "https://www.geckoterminal.com/_next/image?url=https%3A%2F%2Fcoin-images.coingecko.com%2Fcoins%2Fimages%2F29850%2Fsmall%2Fpepe-token.jpeg%3F1696528776&w=32&q=75",
        "time_stamp": 1718380800,
        "call_time": 1718208000,
        "high_time": 1718726400,
        "low_time": 1718640000,
        "call_price": "1.2",
        "high_price": "1.7",
        "low_price": "1.1",
        "more_change": "0.3",
        "less_change": "0.2",
        "harvest_duration": "1",
        "current_price": "1.6",
        "current_marketcap": "500000000",
        "score": "85",
        "type": "meme",
        "btc_more_change": "0.02"
      }
    ]
  }

  const backtests = data?.kol_backtest_results || [];

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Backtest Results for KOL ID: {kolId}
      </Typography>
      <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token Name</TableCell>
                <TableCell>Call Time</TableCell>
                <TableCell>Call Price</TableCell>
                <TableCell>Current Price</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {backtests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((backtest) => (
                  <TableRow key={backtest.id}>
                    <TableCell>{backtest.token_name}</TableCell>
                    <TableCell>{fDateTime(backtest.call_time)}</TableCell>
                    <TableCell>{backtest.call_price}</TableCell>
                    <TableCell>{backtest.current_price}</TableCell>
                    <TableCell>
                      <Label color={backtest.score >= 80 ? 'success' : backtest.score >= 50 ? 'warning' : 'error'}>
                        {backtest.score}
                      </Label>
                    </TableCell>
                    <TableCell>{backtest.type}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={backtests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}