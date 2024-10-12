#!/bin/sh
echo "Usuário: $PGUSER"
echo "Banco: $PGDATABASE"
echo "Porta: $PGPORT"

# Aguardar até que o banco esteja pronto para conexões
until pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER"; do
  echo "Aguardando o banco de dados..."
  sleep 2
done

echo "Banco de dados está pronto! Iniciando a aplicação."

# Rodar as migrações e iniciar a aplicação
npm run migrate
npm run dev
