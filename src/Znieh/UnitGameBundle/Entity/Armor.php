<?php

namespace Znieh\UnitGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Armor
 *
 * @ORM\Table()
 * @ORM\Entity
 * @ExclusionPolicy("all")
 */
class Armor
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
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User", inversedBy="armors")
     */
    private $user;

    /**
    * @ORM\ManyToMany(targetEntity="Znieh\VillageGameBundle\Entity\ArmorPart", cascade={"persist"})
    * @Expose
    */
    private $parts;

    /**
    * @ORM\ManyToMany(targetEntity="Znieh\VillageGameBundle\Entity\Rune", cascade={"persist"})
    * @Expose
    */
    private $runes;

    /**
    * @ORM\ManyToMany(targetEntity="Znieh\VillageGameBundle\Entity\Insigna", cascade={"persist"})
    * @Expose
    */
    private $insignas;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\VillageGameBundle\Entity\ArmorType")
     * @ORM\JoinColumn(nullable=false)
     * @Expose
     */
    private $type;


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
     * Constructor
     */
    public function __construct()
    {
        $this->parts = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set user
     *
     * @param \Znieh\UserBundle\Entity\User $user
     *
     * @return Armor
     */
    public function setUser(\Znieh\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Znieh\UserBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Add parts
     *
     * @param \Znieh\VillageGameBundle\Entity\ArmorPart $parts
     *
     * @return Armor
     */
    public function addPart(\Znieh\VillageGameBundle\Entity\ArmorPart $parts)
    {
        $this->parts[] = $parts;

        return $this;
    }

    /**
     * Remove parts
     *
     * @param \Znieh\VillageGameBundle\Entity\ArmorPart $parts
     */
    public function removePart(\Znieh\VillageGameBundle\Entity\ArmorPart $parts)
    {
        $this->parts->removeElement($parts);
    }

    /**
     * Get parts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getParts()
    {
        return $this->parts;
    }

    /**
     * Set type
     *
     * @param \Znieh\VillageGameBundle\Entity\ArmorType $type
     *
     * @return Armor
     */
    public function setType(\Znieh\VillageGameBundle\Entity\ArmorType $type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\VillageGameBundle\Entity\ArmorType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Add runes
     *
     * @param \Znieh\VillageGameBundle\Entity\Rune $runes
     *
     * @return Armor
     */
    public function addRune(\Znieh\VillageGameBundle\Entity\Rune $runes)
    {
        $this->runes[] = $runes;

        return $this;
    }

    /**
     * Remove runes
     *
     * @param \Znieh\VillageGameBundle\Entity\Rune $runes
     */
    public function removeRune(\Znieh\VillageGameBundle\Entity\Rune $runes)
    {
        $this->runes->removeElement($runes);
    }

    /**
     * Get runes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRunes()
    {
        return $this->runes;
    }

    /**
     * Add insignas
     *
     * @param \Znieh\VillageGameBundle\Entity\Insigna $insignas
     *
     * @return Armor
     */
    public function addInsigna(\Znieh\VillageGameBundle\Entity\Insigna $insignas)
    {
        $this->insignas[] = $insignas;

        return $this;
    }

    /**
     * Remove insignas
     *
     * @param \Znieh\VillageGameBundle\Entity\Insigna $insignas
     */
    public function removeInsigna(\Znieh\VillageGameBundle\Entity\Insigna $insignas)
    {
        $this->insignas->removeElement($insignas);
    }

    /**
     * Get insignas
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getInsignas()
    {
        return $this->insignas;
    }
}
