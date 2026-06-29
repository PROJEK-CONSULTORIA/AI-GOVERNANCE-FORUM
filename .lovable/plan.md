Plano para hospedar apenas o frontend do AI Governance Forum na Vercel, mantendo o backend na Lovable Cloud.

1. Conectar o projeto ao GitHub
   - Usar o menu do editor Lovable para sincronizar o repositório (Project → Settings → Git → GitHub).
   - Isso permite que a Vercel faça deploy automático a partir do GitHub.

2. Preparar o frontend para Vercel
   - Criar `vercel.json` na raiz com regra de reescrita SPA para que todas as rotas sirvam `index.html`:
     ```text
     {
       "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
     }
     ```
   - Verificar o build command (`npm run build` ou `bun run build`) e output directory (`dist`).

3. Configurar variáveis de ambiente públicas na Vercel
   - `VITE_SUPABASE_URL` — URL do projeto Supabase/Lovable Cloud.
   - `VITE_SUPABASE_PUBLISHABLE_KEY` — chave anon/publicável do Supabase.
   - Essas variáveis são client-safe e já devem estar disponíveis no arquivo `.env` do projeto Lovable.

4. Proteger segredos que não devem ir para a Vercel
   - `LOVABLE_API_KEY` é server-only e não deve ser exposta no frontend.
   - `SUPABASE_SERVICE_ROLE_KEY` também é server-only.
   - Como a Vercel só receberá o frontend, server functions e AI Gateway devem continuar sendo chamadas a partir do backend hospedado na Lovable Cloud (via rotas/api publicadas pelo Lovable), não pelo frontend diretamente.

5. Corrigir o hydration mismatch atual
   - O erro aponta para a seção de contato, onde uma extensão de navegador (LastPass) injeta um `<div data-lastpass-icon-root>`.
   - Revisar o formulário de contato e envolver inputs sensíveis em um wrapper client-only, ou adicionar `suppressHydrationWarning` onde apropriado, para evitar mismatch entre SSR e cliente.

6. Criar/verificar rotas e metadados
   - Garantir que as rotas `/` e `/programacao` existam e estejam registradas corretamente no `routeTree.gen.ts`.
   - Atualizar títulos, meta description e Open Graph para refletir o AI Governance Forum 2026 antes de qualquer deploy externo.

7. Testar e fazer deploy
   - Fazer deploy inicial na Vercel a partir do repositório GitHub.
   - Verificar se a navegação entre `/` e `/programacao` funciona corretamente (SPA rewrite).
   - Confirmar que o formulário de contato e os links de navegação funcionam sem erros de hydration.

Nota: se houver server functions que o frontend precisa chamar, essas chamadas devem apontar para as URLs estáveis da Lovable Cloud (`project--{id}.lovable.app` ou `-dev.lovable.app`), não para a Vercel, já que a Vercel não executará o backend TanStack Start neste setup.