import { Injectable } from '@nestjs/common';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gjqrmubofcrkvikjvzwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcXJtdWJvZmNya3Zpa2p2endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0NjcyMTMsImV4cCI6MjAzNTA0MzIxM30.W_Fbze5sFJJiUeBL1pIuC6cyguxtemO3of7dGsCPfgE';

const supabase = createClient(supabaseUrl, supabaseKey)

@Injectable()
export class TestService {

    async findAll(): Promise<any []> {
        const { data, error } = await supabase
            .from('test_sns')
            .select('*');
        if (error) throw new Error(error.message);
        return data;
    }

    async insert(): Promise<any> {
        const { data, error } = await supabase
            .from('test')
            .insert([
                { "id": 3, "ok": true },
            ])
            .select();
        return error;
    }

}
