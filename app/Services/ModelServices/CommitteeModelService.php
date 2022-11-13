<?php

namespace App\Services\ModelServices;

trait CommitteeModelService
{
    public function getTypeNameShort(int $type)
    {
        $typeNames = ['', 'QAC', 'FQAC', 'PSAC'];

        try {
            return $typeNames[$type];
        } catch (\Throwable $th) {
            return '';
        }
    }

    public function getTypeName(int $type)
    {
        $typeNames = ['', 'Quality Assurance Committee (QAC)', 'Faculty Quality Assurance Committee (FQAC)', 'Program Self Assessment Committee (PSAC)'];

        try {
            return $typeNames[$type];
        } catch (\Throwable $th) {
            return '';
        }
    }

    public function getSubTypeName(int $type, ?int $subType = 0)
    {
        $subTypeNames2 = ['', 'Faculty of Engineering', 'Faculty of Life Science', 'Faculty of Science', 'Faculty of Business Studies', 'Faculty of  Social Science', 'Faculty of Arts'];

        $subTypeNames3 = ['', 'Department of Computer Science and Engineering (CSE)', 'Department of  Information and Communication Technology (ICT)', 'Department of  Textile Engineering (TE)', 'Department of  Environmental Science and Resource Management (ESRM)', 'Department of  Criminology and Police Science (CPS)', 'Department of  Food Technology and Nutritional Science (FTNS)', 'Department of  Biotechnology and Genetic Engineering (BGE)', 'Department of  Biochemistry and Molecular Biology (BMB)', 'Department of  Pharmacy', 'Department of  Physics', 'Department of  Chemistry', 'Department of  Mathematics', 'Department of  Statistics', 'Department of  Business Administration', 'Department of Economics', 'Department of Accounting', 'Department of Management', 'Department of English'];

        try {
            if ($type == 2) {
                return $subTypeNames2[$subType];
            } else if ($type == 3) {
                return $subTypeNames3[$subType];
            }
        } catch (\Throwable $th) {
            return '';
        }

        return '';
    }
}
