import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

type Member = {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  age: number | undefined;
  address: string;
  health_issue?: string;
  status: string;
  join_date: string;
  created_at?: string;
  updated_at?: string;
  photo_url?: string;
  emergency_contact?: string;
};

type AddMember = {
  user_name: string;
  email: string;
  phone: string;
  age: number | undefined;
  address: string;
  health_issue?: string;
  status: string;
  join_date: string;
  created_at?: string;
  updated_at?: string;
  emergency_contact?: string;
};

export function MemberLandingPage() {
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [mform, msetForm] = useState<AddMember>({
    user_name: "",
    email: "",
    phone: "",
    age: undefined,
    address: "",
    health_issue: "",
    status: "active",
    join_date: "",
    emergency_contact: "",
  });

  const [errors, setErrors] = useState<AddMember>({
    user_name: "",
    email: "",
    phone: "",
    age: undefined,
    address: "",
    status: "",
    join_date: "",
  });

  async function fetchUsers() {
    const response = await fetch("http://localhost:3000/api/members");
    const data = await response.json();
    setMembers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "user_name":
        if (!value.trim()) {
          error = "User name is required";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email address";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(value)) {
          error = "Phone number must be 10 digits";
        }
        break;

      case "age":
        if (!value) {
          error = "Age is required";
        } else if (Number(value) <= 0) {
          error = "Age must be greater than 0";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required";
        }
        break;

      case "status":
        if (!value) {
          error = "Status is required";
        }
        break;

      case "join_date":
        if (!value) {
          error = "Join date is required";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    msetForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSelectChange = (value: string) => {
    msetForm((prev) => ({
      ...prev,
      status: value,
    }));

    validateField("status", value);
  };

  const handleBlur = (event: any) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const resetForm = () => {
    msetForm({
      user_name: "",
      email: "",
      phone: "",
      age: undefined,
      address: "",
      health_issue: "",
      status: "active",
      join_date: "",
      emergency_contact: "",
    });
  };

  const resetErrors = () => {
    setErrors({
      user_name: "",
      email: "",
      phone: "",
      age: undefined,
      address: "",
      status: "",
      join_date: "",
    });
  };

  const AddMemberSubmit = async (e: React.FormEvent) => {
    // add validation check
    e.preventDefault();

    const fields = [
      "user_name",
      "email",
      "phone",
      "age",
      "address",
      "status",
      "join_date",
    ];

    fields.forEach((field) => {
      validateField(field, mform[field as keyof typeof mform] as string);
    });

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    const res = await fetch("http://localhost:3000/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mform),
    });
    const userData = await res.json();
    // console.log("userData", userData);
    setOpen(false);
    resetForm()
    resetErrors()
    fetchUsers();
  };

  const openDialog = () => {
    setOpen(true);
    resetForm();
    resetErrors();
  };

  return (
    <>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={openDialog}>
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Member</DialogTitle>
                <DialogDescription>
                  Make add your members here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup className="h-[400px] overflow-y-auto overflow-x-hidden">
                <Field>
                  <Label htmlFor="user_name">
                    User Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="user_name"
                    name="user_name"
                    value={mform.user_name}
                    required
                    onInput={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.user_name && (
                    <p className="text-sm text-red-500">{errors.user_name}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={mform.email}
                    onInput={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="phone">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                    value={mform.phone}
                    onInput={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="age">
                    Age <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    required
                    type="number"
                    value={mform.age}
                    onInput={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="address">
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    required
                    value={mform.address}
                    onInput={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="health_issue">Health Issue</Label>
                  <Input
                    id="health_issue"
                    name="health_issue"
                    value={mform.health_issue}
                    onInput={handleChange}
                  />
                </Field>

                <Field className="w-full">
                  <Label htmlFor="status">
                    Status <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    required
                    value={mform.status}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select</SelectLabel>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">InActive</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-red-500">{errors.status}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="join_date">
                    Join Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="join_date"
                    name="join_date"
                    type="date"
                    required
                    value={mform.join_date}
                    onInput={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.join_date && (
                    <p className="text-sm text-red-500">{errors.join_date}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="emergency_contact">Emergency Contact</Label>
                  <Input
                    id="emergency_contact"
                    name="emergency_contact"
                    value={mform.emergency_contact}
                    onInput={handleChange}
                  />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={(e) => {
                    AddMemberSubmit(e);
                  }}
                  type="submit"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <Table style={{ marginTop: "14px" }}>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.length &&
            members.map((item: Member) => {
              return (
                <TableRow>
                  <TableCell className="font-medium">
                    {item.user_name}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.join_date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
