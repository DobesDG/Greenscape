import { toast } from "react-toastify";
import { UserSchema } from "./UserSchema";
import { supabase } from "./Supabase";

export async function createUser(payload: UserSchema) {
  const errorToast = () => toast.error("Conta já cadastrada");

  const errorSignUpToast = () => toast.error("Email inválido");

  const sucessToast = () => toast.success("Conta criada com sucesso");

  const { data, error } = await supabase
    .from("greenscape")
    .select("email")
    .eq("email", `${payload.userData.email}`);

  if (error || data.length > 0) {
    errorToast();
    return;
  }

  const { error: errorSignup } = await supabase.auth.signUp({
    email: payload.userData.email,
    password: payload.userData.password,
  });
  if (errorSignup) {
    errorSignUpToast();
    return;
  }

  const { error: insertError } = await supabase.from("greenscape").insert({
    user_name: payload.userData.userName,
    email: payload.userData.email,
    full_name: payload.personalData.fullName,
    cpf: payload.personalData.cpf,
    cep: payload.address.cep,
    street: payload.address.state,
    number: payload.address.number,
    state: payload.address.state,
    city: payload.address.city,
  });
  if (insertError) {
    errorToast();
    return;
  }

  sucessToast();
}
