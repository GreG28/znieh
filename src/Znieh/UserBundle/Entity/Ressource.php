<?php

namespace Znieh\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Ressources
 *
 * @ORM\Table()
 * @ORM\Entity()
 */
class Ressource
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="gold", type="integer")
     */
    private $gold;

    /**
     * @var integer
     *
     * @ORM\Column(name="sto", type="integer")
     */
    private $sto;

    /**
     * @var integer
     *
     * @ORM\Column(name="cuivre", type="integer")
     */
    private $cuivre;

    /**
     * @var integer
     *
     * @ORM\Column(name="bronze", type="integer")
     */
    private $bronze;

    /**
     * @var integer
     *
     * @ORM\Column(name="etoffeMineure", type="integer")
     */
    private $etoffeMineure;

    /**
     * @var integer
     *
     * @ORM\Column(name="etoffeStandart", type="integer")
     */
    private $etoffeStandart;

    /**
     * @var integer
     *
     * @ORM\Column(name="cuirReche", type="integer")
     */
    private $cuirReche;

    /**
     * @var integer
     *
     * @ORM\Column(name="cuirBrut", type="integer")
     */
    private $cuirBrut;

    /**
     * @var integer
     *
     * @ORM\Column(name="boisCedre", type="integer")
     */
    private $boisCedre;

    /**
     * @var integer
     *
     * @ORM\Column(name="boisChene", type="integer")
     */
    private $boisChene;


    public function __construct()
    {
        $this->gold = 0;
        $this->sto = 0;
        $this->cuivre = 0;
        $this->bronze = 0;
        $this->etoffeMineure = 0;
        $this->etoffeStandart = 0;
        $this->cuirReche = 0;
        $this->cuirBrut= 0;
        $this->boisChene = 0;
        $this->boisCedre = 0;
    }


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set gold
     *
     * @param integer $gold
     * @return Ressource
     */
    public function setGold($gold)
    {
        $this->gold = $gold;
    
        return $this;
    }

    /**
     * Get gold
     *
     * @return integer 
     */
    public function getGold()
    {
        return $this->gold;
    }

    public function hasEnoughGold($val)
    {
        if($this->gold >= $val)
            return true;
        return false;
    } 

    public function addGold($mod)
    {
        if($this->gold + $mod < 0)
            $this->gold = 0;
        else
            $this->gold = $this->gold + $mod;
    } 

    /**
     * Set sto
     *
     * @param integer $sto
     * @return Ressource
     */
    public function setSto($sto)
    {
        $this->sto = $sto;
    
        return $this;
    }

    /**
     * Get sto
     *
     * @return integer 
     */
    public function getSto()
    {
        return $this->sto;
    }

    public function hasEnoughSto($val)
    {
        if($this->sto >= $val)
            return true;
        return false;
    } 

    public function addSto($mod)
    {
        if($this->sto + $mod < 0)
            $this->sto = 0;
        else
            $this->sto = $this->sto + $mod;
    } 

    /**
     * Set cuivre
     *
     * @param integer $cuivre
     * @return Ressource
     */
    public function setCuivre($cuivre)
    {
        $this->cuivre = $cuivre;
    
        return $this;
    }

    /**
     * Get cuivre
     *
     * @return integer 
     */
    public function getCuivre()
    {
        return $this->cuivre;
    }

    public function hasEnoughCuivre($val)
    {
        if($this->cuivre >= $val)
            return true;
        return false;
    } 

    public function addCuivre($mod)
    {
        if($this->cuivre + $mod < 0)
            $this->cuivre = 0;
        else
            $this->cuivre = $this->cuivre + $mod;
    } 

    /**
     * Set bronze
     *
     * @param integer $bronze
     * @return Ressource
     */
    public function setBronze($bronze)
    {
        $this->bronze = $bronze;
    
        return $this;
    }

    /**
     * Get bronze
     *
     * @return integer 
     */
    public function getBronze()
    {
        return $this->bronze;
    }

    public function hasEnoughBronze($val)
    {
        if($this->gold >= $val)
            return true;
        return false;
    } 

    public function addBronze($mod)
    {
        if($this->bronze + $mod < 0)
            $this->bronze = 0;
        else
            $this->bonze = $this->bronze + $mod;
    } 

    /**
     * Set etoffeMineure
     *
     * @param integer $etoffeMineure
     * @return Ressource
     */
    public function setEtoffeMineure($etoffeMineure)
    {
        $this->etoffeMineure = $etoffeMineure;
    
        return $this;
    }

    /**
     * Get etoffeMineure
     *
     * @return integer 
     */
    public function getEtoffeMineure()
    {
        return $this->etoffeMineure;
    }

    public function hasEnoughEtoffeMineure($val)
    {
        if($this->etoffeMineure >= $val)
            return true;
        return false;
    } 

    public function addEtoffeMineure($mod)
    {
        if($this->etoffeMineure + $mod < 0)
            $this->etoffeMineure = 0;
        else
            $this->etoffeMineure = $this->etoffeMineure + $mod;
    } 

    /**
     * Set etoffeStandart
     *
     * @param integer $etoffeStandart
     * @return Ressource
     */
    public function setEtoffeStandart($etoffeStandart)
    {
        $this->etoffeStandart = $etoffeStandart;
    
        return $this;
    }

    /**
     * Get etoffeStandart
     *
     * @return integer 
     */
    public function getEtoffeStandart()
    {
        return $this->etoffeStandart;
    }

    public function hasEnoughEtoffeStandart($val)
    {
        if($this->etoffeStandart >= $val)
            return true;
        return false;
    } 

    public function addEtoffeStandart($mod)
    {
        if($this->etoffeStandart + $mod < 0)
            $this->etoffeStandart = 0;
        else
            $this->etoffeStandart = $this->etoffeStandart + $mod;
    } 

    /**
     * Set cuirReche
     *
     * @param integer $cuirReche
     * @return Ressource
     */
    public function setCuirReche($cuirReche)
    {
        $this->cuirReche = $cuirReche;
    
        return $this;
    }

    /**
     * Get cuirReche
     *
     * @return integer 
     */
    public function getCuirReche()
    {
        return $this->cuirReche;
    }

    public function hasEnoughCuirReche($val)
    {
        if($this->cuirReche >= $val)
            return true;
        return false;
    } 

    public function addCuirReche($mod)
    {
        if($this->cuirReche + $mod < 0)
            $this->cuirReche = 0;
        else
            $this->cuirReche = $this->cuirReche + $mod;
    } 

    /**
     * Set cuirBrut
     *
     * @param integer $cuirBrut
     * @return Ressource
     */
    public function setCuirBrut($cuirBrut)
    {
        $this->cuirBrut = $cuirBrut;
    
        return $this;
    }

    /**
     * Get cuirBrut
     *
     * @return integer 
     */
    public function getCuirBrut()
    {
        return $this->cuirBrut;
    }

    public function hasEnoughCuirBrut($val)
    {
        if($this->cuirBrut >= $val)
            return true;
        return false;
    } 

    public function addCuirBrut($mod)
    {
        if($this->cuirBrut + $mod < 0)
            $this->cuirBrut = 0;
        else
            $this->cuirBrut = $this->cuirBrut + $mod;
    } 

    /**
     * Set boisCedre
     *
     * @param integer $boisCedre
     * @return Ressource
     */
    public function setBoisCedre($boisCedre)
    {
        $this->boisCedre = $boisCedre;
    
        return $this;
    }

    /**
     * Get boisCedre
     *
     * @return integer 
     */
    public function getBoisCedre()
    {
        return $this->boisCedre;
    }

    public function hasEnoughBoisCedre($val)
    {
        if($this->boisCedre >= $val)
            return true;
        return false;
    } 

    public function addBoisCedre($mod)
    {
        if($this->boisCedre + $mod < 0)
            $this->boisCedre = 0;
        else
            $this->boisCedre = $this->boisCedre + $mod;
    } 

    /**
     * Set boisChene
     *
     * @param integer $boisChene
     * @return Ressource
     */
    public function setBoisChene($boisChene)
    {
        $this->boisChene = $boisChene;
    
        return $this;
    }

    /**
     * Get boisChene
     *
     * @return integer 
     */
    public function getBoisChene()
    {
        return $this->boisChene;
    }

    public function hasEnoughBoisChene($val)
    {
        if($this->boisChene >= $val)
            return true;
        return false;
    } 

    public function addBoisChene($mod)
    {
        if($this->boisChene + $mod < 0)
            $this->boisChene = 0;
        else
            $this->boisChene = $this->boisChene + $mod;
    } 
}