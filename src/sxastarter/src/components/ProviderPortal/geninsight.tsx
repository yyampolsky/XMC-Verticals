'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Truck,
  ShoppingCart,
  Download,
  Search,
  AlertCircle,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';

// ============================================
// GENINSIGHT COMPONENT
// Patient order management interface
// ============================================

export default function GeneInsight() {
  // ============================================
  // MOCK DATA - Edit these objects to customize content
  // ============================================

  const alerts = [
    {
      id: 1,
      title: 'Order Pending Authorization for Sam Soe (DOB 1/6/72)',
      subtitle: 'Requested on 6/22/18 10:45 AM',
      action: 'VIEW',
      type: 'warning',
    },
    {
      id: 2,
      title: 'Incomplete Order',
      subtitle:
        'We received a patient sample on Feb 28, 2022. Please click continue to complete the order.',
      action: 'CONTINUE',
      type: 'warning',
    },
  ];

  const patientOrders = [
    {
      id: 1,
      patientName: 'Noe, Nicole',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic, MTHFR',
      sampleStatus: 'Complete',
      orderStatus: 'View Report',
      statusType: 'complete',
      actionLink: 'View Report',
      hasAlert: false,
    },
    {
      id: 2,
      patientName: 'Soe, Sally',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic, MTHFR',
      sampleStatus: 'Complete',
      orderStatus: 'View Report',
      statusType: 'complete',
      actionLink: 'Upgrade Psychotropic',
      hasAlert: false,
    },
    {
      id: 3,
      patientName: 'Goe, George',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'CYP2D6 Single Gene Report, MTHFR',
      sampleStatus: 'Complete',
      orderStatus: 'View Report',
      statusType: 'complete',
      actionLink: 'Add Psychotropic',
      hasAlert: false,
    },
    {
      id: 4,
      patientName: 'Doe, Jane',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic, MTHFR',
      sampleStatus: 'Complete',
      orderStatus: 'View Report',
      statusType: 'complete',
      actionLink: 'Upgrade Psychotropic',
      hasAlert: false,
    },
    {
      id: 5,
      patientName: 'Joe, Joyce',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic',
      sampleStatus: 'Waiting for Sample',
      orderStatus: 'Incomplete',
      statusType: 'incomplete',
      actionLink: 'Add/Upgrade a Test',
      hasAlert: false,
    },
    {
      id: 6,
      patientName: 'Doe, Donna',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic, MTHFR',
      sampleStatus: 'Waiting for Sample',
      orderStatus: 'Pending',
      statusType: 'pending',
      actionLink: '',
      hasAlert: false,
    },
    {
      id: 7,
      patientName: 'Roe, Richard',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic',
      sampleStatus: 'Sample Received',
      orderStatus: 'Pending',
      statusType: 'pending',
      actionLink: 'Add/Upgrade a Test',
      hasAlert: true,
    },
    {
      id: 8,
      patientName: 'Moe, Marta',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'CYP2D6 Single Gene Report',
      sampleStatus: 'Processing',
      orderStatus: 'Pending',
      statusType: 'pending',
      actionLink: 'Add a Test',
      hasAlert: false,
    },
    {
      id: 9,
      patientName: 'Poe, Paul',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic, MTHFR',
      sampleStatus: 'Kit Shipping Today',
      orderStatus: 'Pending',
      statusType: 'pending',
      actionLink: '',
      hasAlert: false,
    },
    {
      id: 10,
      patientName: 'Poe, Paula',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic',
      sampleStatus: 'Kit Shipping Tomorrow',
      orderStatus: 'Pending',
      statusType: 'pending',
      actionLink: 'Add MTHFR',
      hasAlert: false,
    },
    {
      id: 11,
      patientName: 'Hoe, Howard',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic, MTHFR',
      sampleStatus: 'Kit Shipment Pending Authorization',
      orderStatus: 'Pending Authorization',
      statusType: 'pending-auth',
      actionLink: '',
      hasAlert: false,
    },
    {
      id: 12,
      patientName: 'Zoe, Zach',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic, MTHFR',
      sampleStatus: 'Kit Shipping Today',
      orderStatus: 'Pending',
      statusType: 'pending',
      actionLink: '',
      hasAlert: false,
    },
    {
      id: 13,
      patientName: 'Woe, William',
      patientDOB: 'MM/DD/YYYY',
      orderDate: 'MM/DD/YYYY',
      orderNumber: '0000000',
      product: 'Psychotropic, MTHFR',
      sampleStatus: 'Kit with Patient',
      orderStatus: 'Pending Patient',
      statusType: 'pending-patient',
      actionLink: '',
      hasAlert: false,
    },
  ];

  // ============================================
  // STATE
  // ============================================
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* ============================================ */}
      {/* ACTION BUTTONS SIDEBAR */}
      {/* ============================================ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="h-auto py-4 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">NEW ORDER</span>
        </Button>
        <Button className="h-auto py-4 bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center gap-2">
          <Truck className="w-5 h-5" />
          <span className="font-semibold text-xs sm:text-sm">SCHEDULE FEDEX PICKUP</span>
        </Button>
        <Button className="h-auto py-4 bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold">ORDER SUPPLIES</span>
        </Button>
        <Button className="h-auto py-4 bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          <span className="font-semibold">DOWNLOAD FORMS</span>
        </Button>
      </div>

      {/* ============================================ */}
      {/* ALERTS SECTION */}
      {/* ============================================ */}
      {alerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <h3 className="font-semibold text-orange-900">
                {alerts.length} order{alerts.length > 1 ? 's' : ''} need your input
              </h3>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white rounded-lg p-4 flex items-center justify-between gap-4 border border-orange-200"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground mb-1">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.subtitle}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white flex-shrink-0"
                  >
                    {alert.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ============================================ */}
      {/* SEARCH AND FILTERS */}
      {/* ============================================ */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Find Patient Orders, Results"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Clinic or Clinician" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clinics</SelectItem>
                  <SelectItem value="clinic1">Clinic 1</SelectItem>
                  <SelectItem value="clinic2">Clinic 2</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Status: All</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="incomplete">Incomplete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================ */}
      {/* PATIENT ORDERS TABLE */}
      {/* ============================================ */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    <div className="flex items-center gap-1">
                      Patient
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    Order Date
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    Order Number
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    Product(s)
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    Sample Status
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    Order Status
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    <div className="flex items-center gap-1">
                      Action
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {patientOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b hover:bg-muted/30 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-muted/10'
                    }`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {order.hasAlert && (
                          <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{order.patientName}</p>
                          <p className="text-xs text-muted-foreground">{order.patientDOB}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{order.orderDate}</td>
                    <td className="p-3 text-sm">{order.orderNumber}</td>
                    <td className="p-3 text-sm">{order.product}</td>
                    <td className="p-3">
                      <Badge
                        variant={order.sampleStatus === 'Complete' ? 'default' : 'secondary'}
                        className={
                          order.sampleStatus === 'Complete'
                            ? 'bg-accent hover:bg-accent'
                            : order.sampleStatus.includes('Waiting')
                            ? 'bg-cyan-100 text-cyan-700 hover:bg-cyan-100'
                            : order.sampleStatus === 'Sample Received'
                            ? 'bg-cyan-500 text-white hover:bg-cyan-500'
                            : order.sampleStatus === 'Processing'
                            ? 'bg-cyan-600 text-white hover:bg-cyan-600'
                            : order.sampleStatus.includes('Kit Shipping')
                            ? 'bg-emerald-500 text-white hover:bg-emerald-500'
                            : order.sampleStatus.includes('Kit Shipment Pending')
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                            : order.sampleStatus === 'Kit with Patient'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                            : ''
                        }
                      >
                        {order.sampleStatus}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={order.statusType === 'complete' ? 'default' : 'secondary'}
                        className={
                          order.statusType === 'complete'
                            ? 'bg-cyan-600 text-white hover:bg-cyan-600'
                            : order.statusType === 'incomplete'
                            ? 'bg-cyan-100 text-cyan-700 hover:bg-cyan-100'
                            : order.statusType === 'pending'
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                            : order.statusType === 'pending-auth'
                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                            : order.statusType === 'pending-patient'
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                            : ''
                        }
                      >
                        {order.orderStatus}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {order.actionLink && (
                        <Button
                          variant="link"
                          className="text-cyan-600 hover:text-cyan-700 p-0 h-auto"
                        >
                          {order.actionLink}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
