import { createFileRoute } from "@tanstack/react-router";
import { Download, Search, Filter, CalendarClock, ArrowUpRight, ArrowDownRight, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { rupiah } from "@/lib/pos-data";
import { useDebts, type DebtWithStatus, type SupabaseDebt } from "@/lib/useDebts";

export const Route = createFileRoute("/piutang")({
  head: () => ({
    meta: [
      { title: "Laporan Piutang — Crave" },
      { name: "description", content: "Pantau tagihan dan utang pelanggan" }
    ],
  }),
  component: PiutangPage,
});

function PiutangPage() {
  const { data: debts = [], isLoading, error, payDebtMutation } = useDebts("piutang");
  const [payDebt, setPayDebt] = useState<SupabaseDebt | null>(null);
  
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");

  const totalPiutang = debts.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDibayar = debts.reduce((acc, curr) => acc + curr.paid, 0);
  const sisaPiutang = totalPiutang - totalDibayar;
  const pelangganTelat = debts.filter(d => d.status === "Terlambat" || d.status === "Jatuh tempo hari ini").length;

  const filteredDebts = useMemo(() => {
    return debts.filter((d) => {
      const matchQ = d.customer.toLowerCase().includes(q.toLowerCase()) || (d.phone || "").includes(q);
      
      let matchStatus = true;
      if (statusFilter === "lunas") matchStatus = d.status === "Lunas";
      else if (statusFilter === "belum") matchStatus = d.status === "Berjalan";
      else if (statusFilter === "hari_ini") matchStatus = d.status === "Jatuh tempo hari ini";
      else if (statusFilter === "telat") matchStatus = d.status === "Terlambat";

      return matchQ && matchStatus;
    });
  }, [debts, q, statusFilter]);

  const handlePaySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!payDebt) return;
    
    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get("amount"));
    
    payDebtMutation.mutate(
      { id: payDebt.id, amount },
      {
        onSuccess: () => {
          toast.success(`Pembayaran Rp${amount.toLocaleString("id-ID")} dari ${payDebt.customer} dicatat`);
          setPayDebt(null);
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <AppShell
      title="Laporan Piutang"
      subtitle="Pantau sisa tagihan dan jadwal jatuh tempo pelanggan"
      actions={
        <Button className="rounded-xl" onClick={() => toast.success("Mengekspor laporan piutang ke PDF...")}>
          <Download className="size-4" /> <span className="hidden sm:inline">Ekspor PDF</span>
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Ringkasan */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="card-soft p-4 flex flex-col gap-2 bg-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <CalendarClock className="size-5" />
              <span className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                Sisa Tagihan
              </span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-black">{rupiah(sisaPiutang)}</p>
              <p className="text-xs font-medium opacity-80">Total Belum Dibayar</p>
            </div>
          </div>
          <div className="card-soft p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-bold">Total Terbayar</span>
              <span className="flex items-center gap-1 text-xs font-bold text-success">
                <ArrowUpRight className="size-3" /> +15%
              </span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-black text-foreground">{rupiah(totalDibayar)}</p>
              <p className="text-xs text-muted-foreground">Dana sudah masuk</p>
            </div>
          </div>
          <div className="card-soft p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-bold">Perhatian Khusus</span>
              <span className="flex items-center gap-1 text-xs font-bold text-destructive">
                <ArrowDownRight className="size-3" /> Follow Up
              </span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-black text-destructive">{pelangganTelat} Pelanggan</p>
              <p className="text-xs text-muted-foreground">Lewat / jatuh tempo hari ini</p>
            </div>
          </div>
        </div>

        {/* Area Tabel */}
        <div className="card-soft p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input 
                placeholder="Cari nama pelanggan atau No HP..." 
                className="pl-9 rounded-xl bg-background" 
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl bg-background">
                <SelectValue placeholder="Status Tagihan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Status</SelectItem>
                <SelectItem value="lunas">Lunas</SelectItem>
                <SelectItem value="belum">Belum jatuh tempo</SelectItem>
                <SelectItem value="hari_ini">Jatuh tempo hari ini</SelectItem>
                <SelectItem value="telat">Terlambat</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-xl gap-2 bg-background">
              <Filter className="size-4" /> Filter
            </Button>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-background">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Nama Pelanggan</TableHead>
                    <TableHead className="whitespace-nowrap">No HP</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Total Tagihan</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Sudah Dibayar</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Sisa Tagihan</TableHead>
                    <TableHead className="whitespace-nowrap">Jatuh Tempo</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDebts.map((d) => {
                    const sisa = d.amount - d.paid;
                    let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
                    if (d.status === "Terlambat") badgeVariant = "destructive";
                    else if (d.status === "Jatuh tempo hari ini") badgeVariant = "default";
                    else if (d.status === "Lunas") badgeVariant = "outline";

                    return (
                      <TableRow key={d.id}>
                        <TableCell className="font-bold">{d.customer}</TableCell>
                        <TableCell className="text-xs">{d.phone || "-"}</TableCell>
                        <TableCell className="text-right font-medium">{rupiah(d.amount)}</TableCell>
                        <TableCell className="text-right font-medium text-success">{rupiah(d.paid)}</TableCell>
                        <TableCell className="text-right font-bold text-primary">{rupiah(sisa)}</TableCell>
                        <TableCell className="text-xs">
                          {d.due_date ? new Date(d.due_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={badgeVariant} className="rounded-full text-[10px]">
                            {d.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-xl h-7 px-2 text-[11px]" 
                            disabled={sisa <= 0}
                            onClick={() => setPayDebt(d)}
                          >
                            <CreditCard className="size-3 mr-1" /> Bayar
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredDebts.length === 0 || error ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                        Belum ada data piutang pelanggan.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>

      {/* Modal Terima Bayar */}
      <Dialog open={!!payDebt} onOpenChange={(open) => !open && setPayDebt(null)}>
        <DialogContent className="sm:max-w-[425px]">
          {payDebt && (
            <form onSubmit={handlePaySubmit}>
              <DialogHeader>
                <DialogTitle>Terima Pembayaran</DialogTitle>
                <DialogDescription>Mencatat cicilan/pelunasan piutang dari {payDebt.customer}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Sisa Tagihan</Label>
                  <p className="text-xl font-bold">{rupiah(payDebt.amount - payDebt.paid)}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pay_amount">Jumlah Dibayar (Rp)</Label>
                  <Input 
                    id="pay_amount" 
                    name="amount" 
                    type="number" 
                    min="1" 
                    max={payDebt.amount - payDebt.paid} 
                    defaultValue={payDebt.amount - payDebt.paid}
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setPayDebt(null)}>
                  Batal
                </Button>
                <Button type="submit" disabled={payDebtMutation.isPending}>
                  {payDebtMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Proses Bayar
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
