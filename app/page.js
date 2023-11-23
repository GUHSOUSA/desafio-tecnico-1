"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function Home() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');
  const [calculations, setCalculations] = useState([]);
  const { toast: errorToast, successToast } = useToast();

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const addNumber = () => {
    if (number === '' || isNaN(number)) {
      errorToast({
        title: "Erro",
        description: "Por favor adicione um número válido.",
      });
    } else {
      const num = parseInt(number);
      let soma = 0;

      for (let i = 1; i < num; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
          soma += i;
        }
      }

      const newCalculation = {
        number: num,
        soma: soma,
      };
      setResult(soma);
      setCalculations([...calculations, newCalculation]);

      toast({
        title: "Sucesso",
        description: `O cálculo para o número ${num} foi realizado com sucesso.`,
      });
    }
  }

  return (
    <div className="h-screen justify-center w-screen flex items-center">
      <div className="w-[60%]">
        <div className="flex justify-between">
          <Input
            placeholder="Número"
            value={number}
            onChange={handleChange}
            className="max-w-sm"
          />
          <Button onClick={addNumber}>
            Calcular número
          </Button>
        </div>
        <div>
          <Table>
            <TableCaption>Histórico de cálculos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Número Recebido</TableHead>
                <TableHead>Somatório</TableHead>
              </TableRow>
            </TableHeader>
            {calculations.map((num, index) => (
              <TableBody key={index}>
                <TableRow>
                  <TableCell className="font-medium text-green-400">Sucesso</TableCell>
                  <TableCell>{num.number}</TableCell>
                  <TableCell>{num.soma}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  )
}
