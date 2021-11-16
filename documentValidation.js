function validateDocument (_document)
{
    const document = _document.trim();

    if (document.length === 11) // CPF without mask
    {
        const validCpf = verifyCpf(document);

        if (validCpf)
        {
            return true;
        }
        else
        {
            throw new Error("Invalid document!");
        }
    }
    else if (document.length === 18) // CNPJ with mask
    {
        const validCnpj = verifyCnpj(document);

        if (validCnpj)
        {
            return true;
        }
        else
        {
            throw new Error("Invalid document!");
        }
    }
    else if (document.length === 14) // CPF with mask or CNPJ without mask 
    {
        const validCpf = verifyCpf(document);

        if (validCpf)
        {
            return true;
        }
        else
        {
            const validCnpj = verifyCnpj(document);

            if (validCnpj)
            {
                return true;
            }
            else
            {
                throw new Error("Invalid document!");
            }
        }
    }
    else
    {
        throw new Error("Invalid document!");
    }

    function verifyCpf (_document)
    {
        const cpf = _document.trim();
        const regex = /\d{3}\.\d{3}\.\d{3}-\d{2}$||\d{11}/;
    
       
            if (typeof cpf === "string" && regex.test(cpf))
            {
                const validCpf = checkCPF(cpf);
        
                function checkCPF (_cpfString)
                {
                    const strCPF = _cpfString.trim().replace(/[^\d]+/g,'');
        
                    let sum;
                    let rest;
                    sum = 0;   
        
                    if (strCPF === "00000000000")
                    {
                        return false;
                    };
                
                    for (let i = 1; i <= 9; i++)
                    {
                        sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
                    };
                
                    rest = (sum * 10) % 11;
                    if ((rest === 10) || (rest === 11)) 
                    {
                        rest = 0;
                    };
                
                    if (rest !== parseInt(strCPF.substring(9, 10)))
                    {
                        return false;
                    };
                
                    sum = 0;
                    for (let i = 1; i <= 10; i++)
                    {       
                        sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
                    };
                
                    rest = (sum * 10) % 11;
                    if ((rest === 10) || (rest === 11)) 
                    {
                        rest = 0;
                    };
                
                    if (rest !== parseInt(strCPF.substring(10, 11)))
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    };
                }
        
                if (validCpf)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            } 
            else
            {   
                return false;
            } 
    }
    
    function verifyCnpj  (_document)
    {
        const cnpj = _document.trim();
        const regex = /^\d{2}\.\d{3}\.\d{3}\/000[1|2]-\d{2}$|\d{14}/;
    
        if (typeof (cnpj) === "string" && regex.test(cnpj))
        {
            cnpj = cnpj.replace(/[^\d]+/g,'');
        
            if(cnpj === '')
            {
                return false;
            }
            
            if (cnpj.length != 14)
            {
                return false;
            }
        
            // Elimina CNPJs invalidos conhecidos
            if (cnpj === "00000000000000" || 
                cnpj === "11111111111111" || 
                cnpj === "22222222222222" || 
                cnpj === "33333333333333" || 
                cnpj === "44444444444444" || 
                cnpj === "55555555555555" || 
                cnpj === "66666666666666" || 
                cnpj === "77777777777777" || 
                cnpj === "88888888888888" || 
                cnpj === "99999999999999")
            {
                return false;
            }
                
            // Valida DVs
            let size = cnpj.length - 2
            let numbers = cnpj.substring(0, size);
            let digits = cnpj.substring(size);
            let sum = 0;
            let pos = size - 7;
    
            for (i = size; i >= 1; i--)
            {
                sum += numbers.charAt(size - i) * pos--;
    
                if (pos < 2)
                {
                    pos = 9;
                }
            }
    
            result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    
            if (result != digits.charAt(0))
            {
                return false;
            }
                
            size = size + 1;
            numbers = cnpj.substring(0,size);
            sum = 0;
            pos = size - 7;
    
            for (i = size; i >= 1; i--)
            {
                sum += numbers.charAt(size - i) * pos--;
                
                if (pos < 2)
                {
                    pos = 9;
                }
            }
    
            result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    
            if (result != digits.charAt(1))
            {
                return false;
            }
                
            return true;
        }
        else
        {
            return false;
        }
    }
}
