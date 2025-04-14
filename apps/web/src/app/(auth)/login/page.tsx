import { Form } from './form'

export default function LoginPage() {
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Bem-vindo de volta!</h1>
        <p className="text-muted-foreground">
          Entre na sua conta e descubra cursos exclusivos feitos para você!
        </p>
      </div>
      <Form />
    </>
  )
}
